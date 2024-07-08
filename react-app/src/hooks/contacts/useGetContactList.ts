import { useEffect, useState } from "react"
import { responseContactData } from "../../type/api/contact";
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";



export const useGetContactList = () => {
  const [contacts, setContacts] = useState<responseContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    axios.get(url + "/contacts/list")
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