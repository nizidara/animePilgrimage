export type loginData = {
    loginId: string;
    password: string;
}

export type userData = {
    user_id: number;
    user_name: string;
    user_attribute_name: 'not member' | 'admin' | 'normal member' | 'special member' | 'others';
}

export type userToken = {
    access_token: string;
    token_type: string;
    user_id: string;
}