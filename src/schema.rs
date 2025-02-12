// @generated automatically by Diesel CLI.

diesel::table! {
    passwords (id) {
        id -> Int4,
        nome_servico -> Varchar,
        email -> Varchar,
        url_servico -> Varchar,
        url_image -> Nullable<Varchar>,
        senha -> Nullable<Varchar>,
        senha_size -> Nullable<Int4>,
    }
}

diesel::table! {
    users (id) {
        id -> Integer,
        nome -> Text,
        email -> Text,
        username -> Text,
        senha -> Text,
        chave_secreta_2fa -> Nullable<Text>,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    passwords,
    users,
);
