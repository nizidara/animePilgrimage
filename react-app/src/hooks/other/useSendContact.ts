import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseContactData, sendContactData, sendContactFormData} from "../../type/api/contact";
import { fastAPIURL } from "../../properties/properties";


//お問い合わせ内容送信機能
export const useSendContact = () => {
    const [responseData, setResponseData] = useState<responseContactData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //お問い合わせページの入力内容をpostし，responseに保存
    const send = useCallback((formData : sendContactFormData) => {
        const sendData : sendContactData = {
            ...formData,
            contact_date: new Date().toISOString(),
            status: 0,
            user_id: null
        }

        axios.post(url + "/contacts", sendData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/contact/result", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {send};
}