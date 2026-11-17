# 環境変数

実際の値はこのリポジトリに置きません。ローカルは `.env`（Git 管理外）、本番は各サービスのダッシュボードで設定します。

## バックエンド

ローカルではプロジェクト直下の `.env`、本番では Render の Environment に設定します。読み込みは `backend/properties/properties.py` です。

| 変数 | 必須 | 内容 | 例 |
|---|---|---|---|
| `ENV` | | `production` のとき Swagger UI を無効にする | `development` / `production` |
| `DB_USER` | ○ | DB のユーザー名 | |
| `DB_PASSWORD` | ○ | DB のパスワード | |
| `DB_HOST` | ○ | DB のホスト。ポートを付けられる | `127.0.0.1:3307`、`<gateway>.tidbcloud.com:4000` |
| `DB_NAME` | ○ | DB 名 | |
| `DB_SSL` | | `true` のとき TLS で接続し、サーバー証明書を検証する。TiDB Cloud では必須 | `true` |
| `LOCAL_BASE_PATH` | △ | ローカル保存用の画像パス。`develop` ブランチでは未設定だと起動時にエラーになる。`main` では使わない | `C:/.../react-app/public/` |
| `AWS_ACCESS_KEY_ID` | ○ | S3 用のアクセスキー | |
| `AWS_SECRET_ACCESS_KEY` | ○ | S3 用のシークレットキー | |
| `SECRET_KEY` | ○ | JWT の署名鍵 | |
| `ALGORITHM` | ○ | JWT の署名アルゴリズム | `HS256` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | ○ | アクセストークンの有効期限（分） | `60` |
| `REFRESH_TOKEN_EXPIRE_DAYS` | ○ | リフレッシュトークンの有効期限（日） | `30` |
| `SAMESITE` | ○ | 認証 Cookie の SameSite 属性 | `None` |
| `MAIL_RELAY_URL` | | メール中継スクリプトの URL。未設定ならメール送信をスキップする | |
| `MAIL_RELAY_TOKEN` | | メール中継の共有シークレット。Xserver 側の設定と同じ値 | |

S3 のリージョンとバケット名、CORS の許可オリジンは環境変数ではなく `properties.py` に書いてあります。

### DB コピースクリプト用（一時的に使う）

`backend/database/copy_db.py` を実行するときだけ `.env` に追加します。使い終わったら削除してください。

| 変数 | 内容 |
|---|---|
| `SRC_DB_USER` / `SRC_DB_PASSWORD` / `SRC_DB_HOST` / `SRC_DB_NAME` | コピー元 |
| `DST_DB_USER` / `DST_DB_PASSWORD` / `DST_DB_HOST` / `DST_DB_NAME` | コピー先 |
| `SRC_DB_SSL` / `DST_DB_SSL` | TLS が必要な側に `true` |

## フロントエンド

ローカルでは `react-app/.env`、本番では Vercel の Environment Variables に設定します。Create React App の仕様で、値はビルド時に埋め込まれます。変更したら再デプロイが必要です。

| 変数 | 必須 | 内容 | 例 |
|---|---|---|---|
| `REACT_APP_FASTAPI_URL` | ○ | API のベース URL | `http://localhost:8000` |
| `REACT_APP_MAPBOX_TOKEN` | ○ | Mapbox のアクセストークン | |
| `REACT_APP_ENV` | | `development` のとき React の StrictMode を有効にする | `development` / `production` |

- `REACT_APP_` で始まる値はブラウザに配信されます。秘密にしたい値は入れないでください。
- `REACT_APP_MAPBOX_TOKEN_DEV` はコードから参照していません。
- 地図を表示せずに開発したい場合は、`react-app/src/properties/properties.ts` の `mapboxFlag` を `0` にするとダミーの地図に切り替わります。

## Xserver（メール中継）

環境変数ではなく、サーバー上の `contact_mail_config.php` に書きます。ひな形は `xserver/contact_mail_config.sample.php` です。

| キー | 内容 |
|---|---|
| `token` | 共有シークレット（32 文字以上）。Render の `MAIL_RELAY_TOKEN` と同じ値 |
| `to` | 通知メールの宛先 |
| `from` | 送信元アドレス。Xserver に実在するメールアドレス |

## 秘密情報の扱い

- `.env`、`react-app/.env`、`xserver/contact_mail_config.php` は `.gitignore` 済みです。コミットしないでください。
- このリポジトリは公開されています。ホスト名やユーザー名を含め、接続情報はドキュメントにも書かないでください。
