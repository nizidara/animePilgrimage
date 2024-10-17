export type loginData = {
    loginId: string;
    password: string;
}

export type userData = {
    id: number;
    name: string;
    email: string;
    role: 'guest' | 'free' | 'paid' | 'admin';
}