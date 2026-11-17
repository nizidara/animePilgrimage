# データベース

本番は TiDB Cloud Starter（MySQL 互換）です。2026-11-17 に AWS RDS（MariaDB 11.4）から移行しました。

## 接続

- ドライバは PyMySQL、接続設定は `backend/database/db.py` です。
- TiDB Cloud は TLS 必須です。`DB_SSL=true` を設定すると、OS の CA ストアでサーバー証明書とホスト名を検証して接続します。
- ポートは 4000 です。`DB_HOST` に `ホスト名:4000` の形で指定します。
- 文字コードは `utf8mb4`、照合順序は `utf8mb4_unicode_ci` です。
- 日時は UTC で保存しています。

## スキーマの管理

- テーブルは DB 側で直接管理しています。マイグレーションツールは使っていません。
- アプリは起動時に `create_all` を呼ぶため、モデルにあって DB にないテーブルは自動で作られます。既存テーブルの列は変更されません。
- 列の追加や変更は、DB に DDL を直接実行し、`backend/models/` と `backend/schemas/` を合わせて直します。
- 本番のテーブルは手書きの DDL で作っており、モデル定義と細部が一致しない箇所があります。正は DB 側です。

## テーブル

ID が `VARBINARY(16)` の列は UUID のバイト列です。API では文字列の UUID として扱います。

### マスタ

| テーブル | 内容 | 主キー |
|---|---|---|
| `regions` | 地域。0 が日本全体、1〜47 が都道府県、100 が海外 | `region_id` (INT) |
| `ranges` | コメントの公開範囲。0: 公開、1: 非公開 | `range_id` (INT) |
| `user_attributes` | ユーザー種別。0: 非会員、1: 管理者、2: 一般会員、10: 特別会員、99: その他 | `user_attribute_id` (INT) |

### 本体

| テーブル | 内容 | 主キー | 主な列 |
|---|---|---|---|
| `anime` | アニメ | `anime_id` (AUTO_INCREMENT) | `title`（一意）、`kana`、`file_name`（アイコンの URL）、`introduction`、`flag` |
| `places` | 聖地 | `place_id` (UUID) | `name`、`latitude`、`longitude`、`comment`、`flag`、`created_at`、`region_id`、`anime_id` |
| `anime_photos` | アニメ画像 | `anime_photo_id` (UUID) | `file_name`（URL、一意）、`order`、`place_id` |
| `real_photos` | 現地写真 | `real_photo_id` (UUID) | `file_name`（URL、一意）、`order`、`place_id`、`comment_id` |
| `place_icons` | 聖地のアイコンに使うアニメ画像 | `place_id` | `anime_photo_id` |
| `comments` | コメント（140 文字まで） | `comment_id` (UUID) | `comment`、`comment_date`、`range_id`、`place_id` |
| `users` | ユーザー | `user_id` (UUID) | `user_name`、`login_id`（一意）、`password`（bcrypt ハッシュ）、`flag`、`user_attribute_id` |

### リクエスト・通報・お問い合わせ

| テーブル | 内容 | 主キー | 主な列 |
|---|---|---|---|
| `request_anime` | アニメの修正／削除リクエスト | `request_anime_id` (AUTO_INCREMENT) | `anime_id`、`request_type`（0: 修正、1: 削除）、`contents` |
| `request_places` | 聖地の修正／削除リクエスト | `request_place_id` (AUTO_INCREMENT) | `place_id`、`request_type`（0: 修正、1: 削除）、`contents` |
| `delete_comments` | コメントの通報 | `delete_comment_id` (AUTO_INCREMENT) | `comment_id`、`contents` |
| `contacts` | お問い合わせ | `contact_id` (AUTO_INCREMENT) | `name`、`email`、`title`、`contents`、`status`（0: 未確認、1: 確認中、2: 完了） |

### 未使用（テーブルのみ存在）

`favorite_anime`（お気に入り）、`archives`（行きたい／行った）、`reset_users`（パスワード再発行）は、現在の API からは使っていません。

### 表示フラグ

`anime.flag` と `places.flag` の意味は次のとおりです。一般公開されるのは `1` だけです。

| 値 | 意味 |
|---|---|
| 0 | 非表示 |
| 1 | 表示 |
| 2 | 承認待ち |
| 9 | （`places` のみ）アニメが非表示・承認待ちになったため連動して非表示 |

アニメの `flag` を 0 か 2 にすると、そのアニメの表示中（1）の聖地が 9 になります。アニメを 1 に戻すと、9 の聖地が 1 に戻ります。

### 外部キーと削除時の動作

| 親を削除したとき | 子の動作 |
|---|---|
| `anime` | `places`、`request_anime`、`request_places`、`favorite_anime` を削除 |
| `places` | `anime_photos`、`real_photos`、`place_icons`、`comments`、`request_places`、`archives` を削除 |
| `comments` | `real_photos`、`delete_comments` を削除 |
| `anime_photos` | `place_icons` を削除 |
| `users` | 投稿物の `user_id` などを NULL にする（`archives`、`favorite_anime`、`reset_users` は削除） |
| `regions`、`ranges`、`user_attributes` | 参照されている間は削除できない |

DB 側は行を消すだけです。S3 の画像はアプリ（`backend/cruds/`）が削除します。SQL で直接行を消すと、S3 に画像が残ります。

## TiDB Cloud の注意点

- **無料枠**: Starter の無料枠で運用しています。使用量はコンソールで確認できます。上限を超えた場合の動作は、コンソールの Spending limit の設定に従います。
- **連番**: `AUTO_INCREMENT` のテーブルは `AUTO_ID_CACHE 1` を付けて作成しています。付けないと、ID が大きく飛ぶことがあります。
- **sql_mode**: MariaDB のときと比べて `ONLY_FULL_GROUP_BY`、`NO_ZERO_DATE`、`NO_ZERO_IN_DATE` が有効です。`GROUP BY` を使うクエリを追加するときは注意してください。
- **未対応の構文**: `SET SESSION TRANSACTION READ ONLY` は使えません。
- **パスワード**: コンソールで再表示できません。再発行した場合は Render の `DB_PASSWORD` を更新します。

## DB のコピー（`copy_db.py`）

`backend/database/copy_db.py` は、MySQL 互換の DB から別の DB へ、全テーブルのスキーマとデータをコピーして全行を照合するスクリプトです。RDS から TiDB への移行に使いました。

```bash
cd backend
python database/copy_db.py            # コピー先にテーブルがない場合
python database/copy_db.py --reset    # コピー先のテーブルを削除してからコピー
```

- コピー元・コピー先は `.env` の `SRC_DB_*` / `DST_DB_*` で指定します（[environment-variables.md](environment-variables.md)）。
- コピー元には書き込みません。
- `--reset` はコピー先の全テーブルを削除します。コピー先の指定を間違えないでください。
- ビュー、トリガー、ストアドプロシージャはコピーしません（存在する場合は警告を表示します）。
- 動作確認済みの方向は MariaDB → TiDB です。TiDB → MariaDB（ローカルへの取り込みなど）は未検証です。

## ユーザーの登録

ユーザー登録の API はありません。`users` テーブルに直接登録します。`password` には `backend/logic/auth.py` の `hash_password` で作った bcrypt ハッシュを入れます。
