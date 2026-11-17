# お問い合わせメールの中継

お問い合わせが届くと、管理者に通知メールを送ります。Render の無料プランは外向きの SMTP ポートが使えないため、Xserver に置いた PHP スクリプトを HTTPS で呼び出してメールを送っています。

```
お問い合わせフォーム → API（Render）→ HTTPS POST → contact_mail.php（Xserver）→ 管理者のメールボックス
```

## 関係するファイル

| ファイル | 置き場所 | 内容 |
|---|---|---|
| `backend/logic/mail.py` | Render | 中継スクリプトを呼び出す |
| `xserver/contact_mail.php` | Xserver の公開ディレクトリ | メールを送る |
| `xserver/contact_mail_config.sample.php` | リポジトリのみ | 設定ファイルのひな形 |
| `contact_mail_config.php` | Xserver（`contact_mail.php` と同じ場所） | 実際の設定。秘密を含むためコミットしない |

## 仕組み

- API は `MAIL_RELAY_URL` に JSON（`subject`、`body`、`reply_to`）を POST し、ヘッダー `X-Relay-Token` に `MAIL_RELAY_TOKEN` を付けます。
- スクリプトはトークンが設定値と一致したときだけ送信します。
- 宛先は設定ファイルの `to` に固定です。リクエストで宛先は指定できません。
- `reply_to` が正しいメールアドレスなら `Reply-To` に設定します。通知メールにそのまま返信できます。
- 送信は API のレスポンスを返したあとにバックグラウンドで行います。送信に失敗しても、お問い合わせは DB に保存されます。

## 設置手順

1. トークンを作ります。

   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

2. `xserver/contact_mail_config.sample.php` を `contact_mail_config.php` という名前でコピーし、`token`、`to`、`from` を書きます。`from` は Xserver に実在するメールアドレスにします。
3. `contact_mail.php` と `contact_mail_config.php` を、Xserver の公開ディレクトリ（`public_html` 配下の任意のディレクトリ）にアップロードします。
4. パーミッションを設定します。

   ```bash
   chmod 644 contact_mail.php
   chmod 600 contact_mail_config.php
   ```

5. Render の環境変数に `MAIL_RELAY_URL`（`contact_mail.php` の URL）と `MAIL_RELAY_TOKEN`（手順 1 の値）を設定します。

`contact_mail.php` を変更した場合は、手順 3 をやり直します。Git の push では反映されません。

## 動作確認

```bash
# トークンなし → 403
curl -i -X POST "$MAIL_RELAY_URL" -H "Content-Type: application/json" -d '{}'

# 実際に 1 通送る → 200
curl -i -X POST "$MAIL_RELAY_URL" \
  -H "Content-Type: application/json" \
  -H "X-Relay-Token: $MAIL_RELAY_TOKEN" \
  -d '{"subject":"relay test","body":"test","reply_to":"someone@example.com"}'
```

Windows の Git Bash から日本語を含む JSON を送ると、文字コードが UTF-8 にならず 400 になることがあります。確認は英数字で行ってください。

| ステータス | 意味 |
|---|---|
| 200 | 送信した |
| 400 | `subject` か `body` がない、または JSON として読めない |
| 403 | トークンが違う、またはサーバー側のトークンが 32 文字未満 |
| 405 | POST 以外で呼び出した |
| 500 | メールの送信に失敗した |

## メールが届かないとき

1. Render のログを確認します。
   - `MAIL_RELAY_URL is not set` → 環境変数が設定されていません。
   - `メール送信中にエラーが発生しました: HTTP Error 403` → Render と Xserver のトークンが一致していません。
2. 上の curl で中継スクリプト単体の動作を確認します。
3. 200 が返るのに届かない場合は、迷惑メールフォルダと、設定ファイルの `to`／`from` を確認します。

## トークンの交換

1. 新しいトークンを作ります。
2. Xserver の `contact_mail_config.php` の `token` を書き換えます。
3. Render の `MAIL_RELAY_TOKEN` を同じ値に更新します（自動で再デプロイされます）。

手順 2 と 3 の間は通知メールが送れません。その間のお問い合わせも DB には保存されるので、管理画面で確認できます。
