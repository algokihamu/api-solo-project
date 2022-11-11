# Schema Design

`pk` = Primary Key
`ref: >` = Many to one
`ref: <` = One to many
`ref: -` = One to one

## ramen_shop

```
{

    id int [pk]
    name varchar(32) [not null]
    city varchar(32)
    region varchar(32)
    address varchar(64) [not null]
    tel_number char(16)
    postal_code char(16) [not null]
}
```

=======
