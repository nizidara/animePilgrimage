# デプロイ

## ブランチ運用

| ブランチ | 用途 |
|---|---|
| `develop` | 開発用。ふだんの作業はここで行う |
| `main` | 本番用。push すると本番にデプロイされる |

`main` には本番専用の差分があります。`develop` を `main` にマージするときに消さないでください。

| ファイル | `main` だけにある内容 |
|---|---|
| `backend/requirements.txt` | 本番でインストールする Python パッケージ |
| `.github/workflows/keep_alive.yml` | Render のスリープ防止（10 分ごとに `/hello` を呼ぶ） |
| `backend/properties/properties.py` | ローカル画像パスの設定（`LOCAL_BASE_PATH` など）をコメントアウト |

## リリース手順

```bash
git checkout develop
# 変更をコミット
git checkout main
git merge --no-ff develop
git push origin develop main
git checkout develop
```

`main` への push で、フロントエンド（Vercel）とバックエンド（Render）が自動でデプロイされます。

### リリース前の確認

- フロントエンド: `react-app/` で `npm ci` のあと `npm run build` が通ること。
- バックエンド: Python パッケージを追加・更新した場合は、`main` の `backend/requirements.txt` にも反映すること。
- 環境変数を追加した場合は、push の前に Render／Vercel へ設定すること（[environment-variables.md](environment-variables.md)）。

### リリース後の確認

- https://api.pilgrimage.nizidara.com/hello が応答すること。
- サイトの表示、コメント投稿、管理者ログイン、画像アップロード。
- お問い合わせを変更した場合は、フォームから 1 通送ってメールが届くこと。

## 各サービスの設定

ビルドコマンドや起動コマンドなどのサービス設定は、各ダッシュボードで管理しています。このリポジトリに設定ファイルはありません。

### Render（バックエンド）

- 無料プラン、リージョンは Singapore です。
- Python は 3.11 または 3.12 が必要です。バージョンは Render の環境変数 `PYTHON_VERSION`（例: `3.12.10`）で指定できます。ビルドログの「Using Python version」で確認できます。
- ビルドに失敗した場合、直前のデプロイがそのまま動き続けます。
- 環境変数を変更して保存すると、自動で再デプロイされます。
- 無料プランは一定時間アクセスがないとスリープするため、GitHub Actions の keep-alive で起こし続けています。
- 無料プランは外向きの SMTP ポートが使えません。メールは Xserver の中継を使います（[mail-relay.md](mail-relay.md)）。

### Vercel（フロントエンド）

- 対象ディレクトリは `react-app/` です。
- Node.js は 20 以上が必要です（Vercel のプロジェクト設定の Node.js Version）。
- 環境変数はビルド時に埋め込まれるため、変更したら再デプロイが必要です。
- ビルドに失敗した場合、直前のデプロイがそのまま公開され続けます。

### TiDB Cloud（データベース）

- デプロイ作業はありません。接続情報は Render の `DB_*` に設定しています。
- 無料枠の使用量（ストレージ、Request Units）は TiDB Cloud のコンソールで確認できます。
- 詳細は [database.md](database.md) を参照してください。

### Amazon S3（画像）

- バケット名とリージョンは `backend/properties/properties.py` にあります。
- Render からはアクセスキー（`AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY`）で接続します。

### Xserver（メール中継）

- `xserver/contact_mail.php` を変更した場合は、Git の push とは別に、サーバーへ手動でアップロードします（[mail-relay.md](mail-relay.md)）。

## 切り戻し

- コードの問題: `main` で該当コミットを `git revert` して push します。
- フロントエンドのみ: Vercel のダッシュボードから以前のデプロイに戻せます。
