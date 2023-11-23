export type User = {
    id: string;
    username: string;
    name: string;
    email: string;
    number: string;
    password: string;
    secret: string;
    secret8byte: string;
    iv: string
    iv8byte: string;
    cv: string;
    id_card: string;
    token: string;
}

export type Files = {
    id: string;
    name: string;
    type: string;
    size: string;
    path: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}