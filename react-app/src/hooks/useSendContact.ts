import { useCallback } from "react";
import { useNavigate } from "react-router-dom"

export type sendContents ={
    name: string;
    email: string;
    title: string;
    contents: string;
}

export const useSendContact = () => {
    const navigation = useNavigate();

    const send = useCallback((sendContents : sendContents) => {
        navigation("/contact/result", {state: {sendContents}})
    }, [navigation])
    return {send};
}