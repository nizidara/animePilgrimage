import { useEffect, useState } from "react"
import { responseContactData } from "../../type/api/contact";
import api from "../../api/axiosInstance";

export const useGetContactList = () => {
    const [contacts, setContacts] = useState<responseContactData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get(`/contacts/list`)
            .then(response => {
                setContacts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    return { contacts, loading, error };
};