import { useEffect, useState } from "react"
import { responseContactData } from "../../type/api/contact";
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";



export const useGetContactDetail = (contact_id: string | null) => {
  const [contact, setContact] = useState<responseContactData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    if(contact_id){
        axios.get(url + "/contacts/detail/" + contact_id)
        .then(response => {
            setContact(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }
  }, []);

  return { contact, loading, error };
};