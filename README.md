# api-solo-project

## データ概要

    ラーメンデータベース（仮）
    テーブル情報：docs/schema.md

## API 説明

### データ取得

#### 全件取得

```
GET /shops/
```

```
リクエストbody:
{
    limit: n    (正数)
}
```

```
ステータスコード：
200
```

```
レスポンスbody：
[
    {ramen_shop 01},
    {ramen_shop 02},
    ...
]
```

#### Id から取得

```
GET /shops/:id
```

```
リクエストbody:
なし
```

```
ステータスコード：
200
```

```
レスポンスbody：
[
    {ramen_shop 01}
]
```

### データ追加

```
POST /shops/
```

```
リクエストbody:
{
    name:           店名        ※必須
    city:           県名
    region:　       市区町村
    address:        住所        ※必須
    tel_number:     電話番号
    postal_code:    郵便番号    ※必須
}
```

```
ステータスコード:
201
```

```
レスポンスbody:
{
    id:             登録後に自動裁判されたID
}
```

### データ更新

```
PATCH /shops/:id
```

```
リクエストbody:
{
    name:           店名        ※必須
    city:           県名
    region:　       市区町村
    address:        住所        ※必須
    tel_number:     電話番号
    postal_code:    郵便番号    ※必須
}
※任意のパラメータ１つ以上
```

```
ステータスコード:
200
```

```
レスポンスbody:
{
    count:             更新されたレコード数
}
```

### データ削除

```
DELETE /shops/:id
```

```
リクエストbody:
なし
```

```
ステータスコード:
200
```

```
レスポンスbody:
{
    count:             削除されたレコード数
}
```
