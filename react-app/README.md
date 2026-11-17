# フロントエンド（react-app）

animePilgrimage の画面です。React 18 + TypeScript（Create React App）で作っています。プロジェクト全体の説明は [../README.md](../README.md) を参照してください。

## コマンド

```bash
npm ci          # package-lock.json どおりにインストール
npm start       # 開発サーバー（http://localhost:3000）
npm run build   # 本番ビルド（build/ に出力）
```

`.env` が必要です。項目は [../docs/environment-variables.md](../docs/environment-variables.md) にあります。

## 主なライブラリ

| ライブラリ | 用途 |
|---|---|
| react-router-dom | 画面遷移 |
| axios | API 呼び出し |
| react-bootstrap / bootstrap | UI |
| mapbox-gl | 地図 |
| react-helmet-async | ページごとの title・meta タグ |
| date-fns / date-fns-tz | 日時の表示（API の UTC を変換） |

## ディレクトリ

```
src/
├── api/            axios の共通設定（Cookie 送信、401 時のトークン再取得）
├── components/
│   ├── atoms/      最小の部品
│   ├── molecules/  部品の組み合わせ
│   ├── organisms/  カード・フォーム・地図などのまとまり
│   ├── templates/  レイアウト
│   └── pages/      画面（admin / anime / comment / other / place / top / user）
├── hooks/          API を呼ぶカスタムフック（anime / comments / contacts / maps / photos / places / regions / users）
├── providers/      Context（ログイン状態、登録・修正フォームの入力内容）
├── router/         ルーティング（Router.tsx）と権限チェック（PrivateRoute.tsx）
├── properties/     環境変数の読み込み
├── type/           型定義（api / externalAPI / form）
├── utilities/      Mapbox 用の変換処理
└── thema/          CSS
```

コンポーネントは Atomic Design の分け方に沿っています。

## 画面一覧

対象の ID はクエリパラメータで渡します（例: `/anime?anime_id=1`、`/place?place_id=<UUID>`）。

### 一般

| パス | 画面 |
|---|---|
| `/` | トップ |
| `/search/anime` | アニメ検索 |
| `/search/place` | 聖地検索 |
| `/anime` | アニメ詳細 |
| `/place/list` | 聖地一覧 |
| `/place` | 聖地詳細 |
| `/place/photo` | 写真の追加 |
| `/register_anime` → `/confirmation` → `/complete` | アニメ登録 |
| `/edit_anime` → `/confirmation` → `/complete` | アニメ修正リクエスト |
| `/register_place` → `/confirmation` → `/complete` | 聖地登録 |
| `/edit_place` → `/confirmation` → `/complete` | 聖地修正リクエスト |
| `/delete_place` → `/confirmation` → `/complete` | 聖地削除リクエスト |
| `/delete_comment` → `/complete` | コメント通報 |
| `/contact` → `/contact/result` | お問い合わせ |
| `/guide`、`/terms`、`/privacy` | 利用ガイド、利用規約、プライバシーポリシー |
| `/login`、`/logout` | ログイン、ログアウト |

### 管理者（`/admin/*`）

管理者でログインしていない場合は、ログイン画面かトップに移動します。

| パス | 画面 |
|---|---|
| `/admin/top` | 管理トップ |
| `/admin/anime/list`、`/admin/anime` | アニメの一覧・詳細 |
| `/admin/place/list`、`/admin/place` | 聖地の一覧・詳細 |
| `/admin/request_anime/list`、`/admin/request_anime` | アニメ修正リクエストの一覧・詳細 |
| `/admin/request_place/list`、`/admin/request_place` | 聖地リクエストの一覧・詳細 |
| `/admin/report_comment/list`、`/admin/report_comment` | コメント通報の一覧・詳細 |
| `/admin/contact/list`、`/admin/contact` | お問い合わせの一覧・詳細 |

画面側の権限チェックは表示の切り替えだけです。実際の権限は API 側で確認しています。

## 認証

- ログイン状態は `providers/AuthContext.tsx` で管理します。
- 認証情報は HttpOnly の Cookie に入っているため、JavaScript からは読めません。API は `api/axiosInstance.ts` 経由で呼びます。
- API が 401 を返すと、`/users/refresh` でトークンを取り直して 1 回だけ再試行します。

## 画像

API が返す画像の `file_name` は S3 の URL です。`http` で始まらない値は `public/` 配下の相対パスとして扱います（ローカル保存時代の互換）。

## TypeScript

ビルドに使うのは TypeScript 4.9 系です。`tsconfig.json` の `"ignoreDeprecations": "6.0"` は、エディタ同梱の新しい TypeScript の非推奨警告を消すためのもので、ビルドには影響しません。
