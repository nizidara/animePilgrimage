import { useCallback, useEffect, useState } from "react"
import { responseContactData } from "../../type/api/contact";
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";

export const useGetContactDetail = (contact_id: string | null) => {
    const [contact, setContact] = useState<responseContactData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContactDetail = useCallback(() => {
        if(contact_id){
            api.get(`${fastAPIURL}/contacts/detail/${contact_id}`)
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

    useEffect(() => {
        fetchContactDetail();
    }, [fetchContactDetail])

    return { contact, loading, error, fetchContactDetail };
};