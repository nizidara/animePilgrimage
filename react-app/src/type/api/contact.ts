import { sendContactFormData } from "../form/contact";

export type sendContactData = sendContactFormData & {
    contact_date: string;
    status: number;
    user_id?: string | null;
}

export type responseContactData = sendContactData & {
    contact_id: number;
    user_name?: string | null;
}