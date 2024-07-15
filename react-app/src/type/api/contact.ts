export type sendContactFormData = {
    name: string;
    email: string;
    title: string;
    contents: string;
}

export type sendContactData = sendContactFormData & {
    contact_date: string;
    status: number;
    user_id?: string | null;
}

export type responseContactData = sendContactData & {
    contact_id: number;
    user_name?: string | null;
}