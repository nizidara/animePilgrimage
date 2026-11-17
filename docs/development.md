# ローカル開発環境

## 必要なもの

- Python 3.11 または 3.12（3.12 で動作確認済み。3.10 以下は依存パッケージが対応していません）
- Node.js 20 以上と npm
- MySQL 互換の DB（ローカルでは MariaDB を使用）
- Mapbox のアクセストークン
- 画像アップロードを試す場合は、S3 に書き込める AWS のアクセスキー

## バックエンド

### 1. 依存パッケージ

`backend/requirements.txt` は `main` ブランチにだけあります。`develop` で作業する場合は `main` から取り出して使います。

```bash
cd backend
python -m venv venv
source venv/Scripts/activate            # Windows (Git Bash)。PowerShell は venv\Scripts\Activate.ps1
git show main:backend/requirements.txt > requirements.txt   # develop にはコミットしない
pip install -r requirements.txt
```

### 2. 設定ファイル

プロジェクト直下（`backend/` の 1 つ上）に `.env` を作ります。項目は [environment-variables.md](environment-variables.md) を参照してください。

### 3. データベース

テーブルは DB 側で管理しています（[database.md](database.md)）。空の DB に対しては、起動時に SQLAlchemy のモデルから不足しているテーブルが作られますが、本番のスキーマと完全には一致しません。本番と同じスキーマとデータが必要な場合は `database/copy_db.py` でコピーします。

### 4. 起動

```bash
cd backend
uvicorn main:app --reload
```

- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs （`ENV` が `production` 以外のとき）

## フロントエンド

```bash
cd react-app
npm ci          # package-lock.json どおりにインストール
npm start       # http://localhost:3000
npm run build   # 本番ビルド
```

`react-app/.env` が必要です（[environment-variables.md](environment-variables.md)）。

`npm install` ではなく `npm ci` を使ってください。`npm install` で依存が新しくなると、本番（lockfile どおり）では出ない型エラーが出ることがあります。例: react-icons 5.5 と TypeScript 4.9 の組み合わせで `TS2786` が出ます。

### 画面遷移で値を受け取るページ

修正・削除リクエストや完了画面などは、前の画面から `navigate(path, { state })` で渡された値を使います。こうしたページは `react-app/src/router/Router.tsx` で `RequireState` で包み、必須の値のキーを `stateKey` に指定します。URL を直接開いたときなど値が無い場合は、トップページへ移動します。

### TypeScript について

- ビルドに使う TypeScript は 4.9 系です（react-scripts 5 の制約）。
- `tsconfig.json` の `"ignoreDeprecations": "6.0"` は、エディタ同梱の新しい TypeScript が出す非推奨警告を消すためのものです。ビルドには影響しません。
- `moduleResolution` は react-scripts が `node` に固定するため、変更できません。

## 依存パッケージの更新と脆弱性の確認

GitHub の Dependabot alerts（リポジトリの Security タブ）で、`main` の `backend/requirements.txt` と `react-app/package-lock.json` が検査されます。

### バックエンド

```bash
pip install pip-audit
pip-audit -r requirements.txt
```

- `requirements.txt` は、間接的な依存も含めてバージョンを固定しています。更新するときは、新しい venv に直接使うパッケージを入れ直し、動作確認のあと `pip freeze` の結果で置き換えます。
- 直接使うパッケージ: fastapi、uvicorn、SQLAlchemy、PyMySQL、cryptography（PyMySQL の認証用）、pydantic、email-validator、python-multipart、PyJWT、bcrypt、boto3、slowapi、python-dotenv。
- `Deprecated` は Python 3.11 でも入る 1.x に固定しています（3.x は Python 3.12 以上が必要）。

### フロントエンド

```bash
cd react-app
npm audit
```

- 画面で実際に動くライブラリ（axios、react-router-dom など）は、`package.json` のバージョンを上げて対応します。
- 残っている指摘は、すべて react-scripts（Create React App）が内部で使うビルド・開発用ツールのものです。Create React App は更新が止まっているため、`npm audit fix` では解消できません（`npm audit fix --force` は react-scripts を壊すので使わないこと）。これらはブラウザに配信されるコードには含まれません。根本的に解消するには、ビルドツールの移行（Vite など）が必要です。

## ログインの確認

Cookie は `Secure` 属性付きで発行されます。ローカルでは `http://localhost` を使ってください（主要なブラウザは localhost を安全なオリジンとして扱います）。

## ブランチ

- 開発は `develop` で行い、`main` にマージします。
- `main` への push が本番デプロイです（[deployment.md](deployment.md)）。
