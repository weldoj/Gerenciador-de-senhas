// @generated automatically by Diesel CLI.

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
