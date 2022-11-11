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
なし
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
