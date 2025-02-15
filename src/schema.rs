// @generated automatically by Diesel CLI.

diesel::table! {
    passwords (id) {
        id -> Nullable<Integer>,
        user_id -> Integer,
        site -> Text,
        email -> Text,
        encrypted_password -> Text,
        iv -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Nullable<Integer>,
        nome -> Text,
        email -> Text,
        username -> Text,
        senha -> Text,
        chave_secreta_2fa -> Nullable<Text>,
    }
}

diesel::joinable!(passwords -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    passwords,
    users,
);
