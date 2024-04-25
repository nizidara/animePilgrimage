import {memo, FC, useState} from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { responseSendContents } from "../../../type/api/contact";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";

export const ContactResult: FC = memo(() =>{
    const location = useLocation();
    
    const responseSendContents = location.state.responseSendContents as responseSendContents;

    return (
        <Container>
            <h2>お問い合わせ完了ページです．</h2>
            <p>id:{responseSendContents.id}</p>
            <p>名前：{responseSendContents.name}さん</p>
            <p>メール：{responseSendContents.email}</p>
            <p>タイトル：{responseSendContents.title}</p>
            <p>内容：{responseSendContents.contents}</p>
            <ContactDetailDisplay />
        </Container>
    )
});