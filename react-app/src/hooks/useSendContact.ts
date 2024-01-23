import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export type sendContents ={
    name: string;
    email: string;
    title: string;
    contents: string;
}

export type responseSendContents ={
    id: number;
    name: string;
    email: string;
    title: string;
    contents: string;
}

export const useSendContact = () => {
    const [responseSendContents, setResponseSendContents] = useState<responseSendContents | null>(null);
    const navigation = useNavigate();
    const url = "http://127.0.0.1:8000";

    const send = useCallback((sendContents : sendContents) => {
        axios.post(url + "/contact", sendContents).then((res) => {
            setResponseSendContents(res.data);
            console.log(res.data);
            
        })
    }, [setResponseSendContents])

    useEffect(() => {
        if(responseSendContents!== null){
            console.log("response");
            console.log(responseSendContents);
            navigation("/contact/result", {state: {responseSendContents}})
        }
    }, [responseSendContents, navigation])

    return {send};
}