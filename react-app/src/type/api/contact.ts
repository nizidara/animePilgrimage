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
    user_id: string | null;
}

export type responseContactData = {
    name: string;
    email: string;
    title: string;
    contents: string;
    contact_date: string;
    status: number;
    user_id: string | null;
    contact_id: number;
}