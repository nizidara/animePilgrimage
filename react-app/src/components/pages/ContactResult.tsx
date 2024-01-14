import {memo, FC, useState} from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { sendContents } from "../../hooks/useSendContact";

export const ContactResult: FC = memo(() =>{
    const location = useLocation();
    
    const sendContents = location.state.sendContents as sendContents;

    return (
        <Container>
            <h2>お問い合わせ完了ページです．</h2>
            <p>名前：{sendContents.name}さん</p>
            <p>メール：{sendContents.email}</p>
            <p>タイトル：{sendContents.title}</p>
            <p>内容：{sendContents.contents}</p>
        </Container>
    )
});