# API エンドポイント

バックエンド（FastAPI）のエンドポイント一覧です。リクエスト／レスポンスの項目は、ローカルで起動して Swagger UI（http://localhost:8000/docs ）で確認できます。本番では Swagger UI を無効にしています。

## 共通事項

- **認証**: ログインで発行される Cookie（`access_token`）で判定します。フロントエンドからは `withCredentials: true` で呼びます。
- **権限**: 「管理者」の API は、未ログインだと 401、管理者以外だと 403 を返します。
- **レート制限**: IP 単位です。超えると 429 を返します。表の「制限」は 1 分あたりの回数です。
- **形式**: 「form」は `multipart/form-data`（画像を含む）、それ以外は JSON です。
- **ID**: アニメは数値、聖地・コメント・写真は UUID の文字列です。UUID として読めない値を渡すと 422（`Invalid ID format`）を返します。

## アニメ `/anime`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/anime/detail/{anime_id}` | 公開 | 50 | アニメの詳細。表示中（flag=1）以外は管理者のみ |
| GET | `/anime/list/search` | 公開 | 100 | 表示中（flag=1）のアニメ一覧（かな順）。絞り込みは画面側で行う |
| GET | `/anime/list/admin` | 管理者 | 10 | 全フラグのアニメ一覧 |
| GET | `/anime/list/edit` | 管理者 | 10 | 修正リクエストの一覧 |
| GET | `/anime/edit/{request_anime_id}` | 管理者 | 30 | 修正リクエストの詳細 |
| POST | `/anime` | 公開 | 2 | アニメの登録（form） |
| POST | `/anime/edit` | 公開 | 3 | 修正リクエストの送信（form） |
| PUT | `/anime/{anime_id}?flag=` | 管理者 | 10 | 表示フラグの変更（聖地のフラグも連動） |
| PUT | `/anime/edit/{request_anime_id}` | 管理者 | 10 | 修正リクエストの承認 |
| PUT | `/anime/edit/admin/{anime_id}` | 管理者 | 10 | アニメの直接編集（form） |
| DELETE | `/anime/{anime_id}` | 管理者 | 2 | アニメの削除 |
| DELETE | `/anime/edit/{request_anime_id}` | 管理者 | 10 | 修正リクエストの削除 |

## 聖地 `/places`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/places/detail/{place_id}` | 公開 | 50 | 聖地の詳細。表示中（flag=1）以外は管理者のみ |
| GET | `/places/list/search` | 公開 | 50 | 聖地の検索。`name`、`anime_id`、`region_id`、`page`、`page_size`（既定 20） |
| GET | `/places/list/admin` | 管理者 | 50 | 管理用の聖地一覧（検索条件は同じ） |
| GET | `/places/request/list` | 管理者 | 50 | 修正／削除リクエストの一覧 |
| GET | `/places/request/detail/{request_place_id}` | 管理者 | 50 | 修正／削除リクエストの詳細 |
| POST | `/places` | 公開 | 3 | 聖地の登録（form） |
| POST | `/places/request` | 公開 | 3 | 修正／削除リクエストの送信 |
| PUT | `/places/{place_id}?flag=` | 管理者 | 10 | 表示フラグの変更 |
| PUT | `/places/edit/{request_place_id}` | 管理者 | 10 | 修正リクエストの承認 |
| PUT | `/places/edit/admin/{place_id}` | 管理者 | 10 | 聖地の直接編集 |
| DELETE | `/places/{place_id}` | 管理者 | 10 | 聖地の削除。コメント・写真・アイコン・リクエストと S3 の画像も消える。画面からは呼んでいない |
| DELETE | `/places/request/{request_place_id}` | 管理者 | 10 | リクエストの削除 |

## コメント `/comments`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/comments/detail/{comment_id}` | 公開 | 60 | コメントの詳細 |
| GET | `/comments/list` | 公開 | 60 | コメントの一覧。`place_id`、`anime_id`、`page`、`page_size`（既定 50） |
| GET | `/comments/report/list` | 管理者 | 60 | 通報の一覧 |
| GET | `/comments/report/detail/{delete_comment_id}` | 管理者 | 60 | 通報の詳細 |
| POST | `/comments` | 公開 | 5 | コメントの投稿（form、写真を添付できる） |
| POST | `/comments/report` | 公開 | 3 | コメントの通報 |
| PUT | `/comments/report/{delete_comment_id}` | 管理者 | 10 | 通報の承認 |
| DELETE | `/comments/{comment_id}` | 管理者 | 10 | コメントの削除 |
| DELETE | `/comments/report/{delete_comment_id}` | 管理者 | 10 | 通報の削除 |

## 写真 `/photos`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/photos/anime/icons/{anime_id}` | 公開 | 50 | アニメのアイコン |
| GET | `/photos/places/icons/{place_id}` | 公開 | 50 | 聖地のアイコン |
| GET | `/photos/anime/list/{place_id}` | 公開 | 30 | 聖地のアニメ画像一覧。`page`、`page_size`（既定 12） |
| GET | `/photos/reals/list/{place_id}` | 公開 | 30 | 聖地の現地写真一覧。`comment_id`、`page`、`page_size`（既定 12） |
| POST | `/photos/anime` | 公開 | 5 | アニメ画像の投稿（form） |
| POST | `/photos/reals` | 公開 | 5 | 現地写真の投稿（form） |
| PUT | `/photos/places/icons` | 公開 | 5 | 聖地のアイコンに使うアニメ画像の設定 |
| DELETE | `/photos/anime/{anime_photo_id}` | 管理者 | 10 | アニメ画像の削除 |
| DELETE | `/photos/reals/{real_photo_id}` | 管理者 | 10 | 現地写真の削除 |

## 地域 `/regions`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/regions/list` | 公開 | 500 | 地域の一覧 |
| GET | `/regions/detail/{region_id}` | 公開 | 500 | 地域の詳細 |

## お問い合わせ `/contacts`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| POST | `/contacts` | 公開 | 2 | お問い合わせの送信。DB に保存し、管理者へ通知メールを送る |
| GET | `/contacts/list` | 管理者 | 10 | お問い合わせの一覧 |
| GET | `/contacts/detail/{contact_id}` | 管理者 | 10 | お問い合わせの詳細 |
| PUT | `/contacts/{contact_id}?status=` | 管理者 | 10 | 対応状況の変更（0: 未確認、1: 確認中、2: 完了） |
| DELETE | `/contacts/{contact_id}` | 管理者 | 10 | お問い合わせの削除 |

## ユーザー `/users`

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| POST | `/users/login` | 公開 | 5 | ログイン（form: `username`、`password`）。認証 Cookie を発行 |
| POST | `/users/refresh` | Cookie | なし | リフレッシュトークンからアクセストークンを再発行 |
| POST | `/users/logout` | 公開 | なし | 認証 Cookie を削除 |
| GET | `/users/auth` | ログイン | なし | ログイン中のユーザー情報。未ログイン、またはユーザーが削除済みの場合は 401 |
| GET | `/users/auth/optional` | 公開 | なし | ログイン中のユーザー情報。未ログインは `null`（200） |

## その他

| メソッド | パス | 権限 | 制限 | 内容 |
|---|---|---|---|---|
| GET | `/hello` | 公開 | 30 | 死活確認。keep-alive から呼ばれる |
