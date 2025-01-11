export type loginData = {
    loginId: string;
    password: string;
}

export type userData = {
    user_id: string;
    user_name: string;
    user_attribute_name: 'not member' | 'admin' | 'normal member' | 'special member' | 'others';
}