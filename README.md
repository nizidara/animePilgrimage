# animePilgrimage

アニメの聖地（舞台になった場所）を地図と写真で探せる、聖地巡礼マップ Web サービスです。

- サイト: https://pilgrimage.nizidara.com/
- API: https://api.pilgrimage.nizidara.com/

## できること

- アニメ・聖地の検索と、地図（Mapbox）での表示
- 聖地の登録、アニメ画像・現地写真の投稿、コメントの投稿（ログイン不要）
- アニメ・聖地の修正／削除リクエスト、コメントの通報、お問い合わせ
- 管理者による承認・編集・削除（管理画面）

## 構成

| 役割 | 技術 | ホスティング |
|---|---|---|
| フロントエンド | React 18 + TypeScript（Create React App）、React Bootstrap、Mapbox GL | Vercel |
| バックエンド | FastAPI + SQLAlchemy（PyMySQL） | Render（無料プラン・Singapore） |
| データベース | TiDB Cloud Starter（MySQL 互換） | TiDB Cloud（AWS Singapore） |
| 画像 | Amazon S3 | AWS（ap-northeast-1） |
| お問い合わせメール | PHP の HTTPS 中継スクリプト | Xserver |

詳しくは [docs/architecture.md](docs/architecture.md) を参照してください。

## ディレクトリ

```
project/
├── backend/      FastAPI アプリ（routers / cruds / models / schemas / logic / database / properties）
├── react-app/    React アプリ
├── xserver/      Xserver に置くメール中継スクリプト
├── docs/         ドキュメント
└── .env          バックエンドの設定（Git 管理外）
```

## ドキュメント

| ドキュメント | 内容 |
|---|---|
| [docs/architecture.md](docs/architecture.md) | 全体構成、認証・画像・メールの仕組み |
| [docs/development.md](docs/development.md) | ローカル開発環境の作り方 |
| [docs/environment-variables.md](docs/environment-variables.md) | 環境変数の一覧と設定場所 |
| [docs/deployment.md](docs/deployment.md) | ブランチ運用とデプロイ手順 |
| [docs/database.md](docs/database.md) | テーブル定義、TiDB Cloud の注意点、DB コピー手順 |
| [docs/api.md](docs/api.md) | API エンドポイント一覧 |
| [docs/mail-relay.md](docs/mail-relay.md) | お問い合わせメール中継の設置と確認方法 |
| [react-app/README.md](react-app/README.md) | フロントエンドの構成と画面一覧 |

要件定義や基本設計などの設計書は、このリポジトリとは別に管理しています。

## クイックスタート

```bash
# バックエンド（backend/ で実行。事前に .env と DB が必要）
uvicorn main:app --reload        # http://localhost:8000 （/docs に Swagger UI）

# フロントエンド（react-app/ で実行。事前に react-app/.env が必要）
npm ci
npm start                        # http://localhost:3000
```

手順の詳細は [docs/development.md](docs/development.md) にあります。
