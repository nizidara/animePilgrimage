import { useEffect, useState } from "react"
import { responseContactData } from "../../type/api/contact";
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";

export const useGetContactDetail = (contact_id: string | null) => {
    const [contact, setContact] = useState<responseContactData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(contact_id){
            axios.get(`${fastAPIURL}/contacts/detail/${contact_id}`)
            .then(response => {
                setContact(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("お問い合わせ取得中にエラーが発生しました");
                setLoading(false);
            });
        }
    }, [contact_id]);

    return { contact, loading, error };
};