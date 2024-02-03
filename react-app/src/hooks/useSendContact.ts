import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { responseSendContents, sendContents } from "../type/api/contact";
import { fastAPIURL } from "../properties/properties";

//お問い合わせ内容送信機能
export const useSendContact = () => {
    const [responseSendContents, setResponseSendContents] = useState<responseSendContents | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //お問い合わせページの入力内容をpostし，responseに保存
    const send = useCallback((sendContents : sendContents) => {
        axios.post(url + "/contact", sendContents).then((res) => {
            setResponseSendContents(res.data);
            // console.log(res.data);
        })
    }, [setResponseSendContents])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseSendContents!== null){
            // console.log("response");
            // console.log(responseSendContents);
            navigation("/contact/result", {state: {responseSendContents}})
        }
    }, [responseSendContents, navigation])

    return {send};
}