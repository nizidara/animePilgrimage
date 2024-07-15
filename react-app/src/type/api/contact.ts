export type sendContactFormData = {
    name: string;
    email: string;
    title: string;
    contents: string;
}

export type sendContactData = {
    name: string;
    email: string;
    title: string;
    contents: string;
    contact_date: string;
    status: number;
    user_id?: string;
}

export type responseContactData = {
    name: string;
    email: string;
    title: string;
    contents: string;
    contact_date: string;
    status: number;
    user_id?: string;
    contact_id: number;
    user_name?: string;
}