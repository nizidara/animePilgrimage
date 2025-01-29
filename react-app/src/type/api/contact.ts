import { sendContactFormData } from "../form/contact";

export type sendContactData = sendContactFormData & {
    status: number;
    user_id?: string | null;
}

export type responseContactData = sendContactData & {
    contact_id: number;
    contact_date: string;
    user_name?: string | null;
}