import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseContactData, sendContactData} from "../../type/api/contact";
import { fastAPIURL } from "../../properties/properties";
import { sendContactFormData } from "../../type/form/contact";
import { useAuth } from "../../providers/AuthContext";

//post contact
export const useSendContact = () => {
    const [responseData, setResponseData] = useState<responseContactData | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);
    const navigation = useNavigate();
    const {user} = useAuth();

    //post
    const send = useCallback((formData : sendContactFormData) => {
        setSendError(null);
        
        const sendData : sendContactData = {
            ...formData,
            contact_date: new Date().toISOString(),
            status: 0,
            user_id: user ? user.user_id : null
        }

        axios.post(`${fastAPIURL}/contacts`, sendData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setSendError("送信中にエラーが発生しました")
        })
    }, [setResponseData, user])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/contact/result", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {send, sendError};
}