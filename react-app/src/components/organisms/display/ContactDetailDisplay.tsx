import { FC, memo } from "react"
import { responseContactData } from "../../../type/api/contact";


export const ContactDetailDisplay: FC<responseContactData> = memo((props) => {
    const {contact_id, status, contact_date, user_id, name, email, title, contents} = props;

    return (
        <>
            <p>id:{contact_id}</p>
            <p>contact_date:{contact_date}</p>
            <p>userId:{user_id}</p>
            <p>status:{status}</p>
            <p>名前：{name}さん</p>
            <p>メール：{email}</p>
            <p>タイトル：{title}</p>
            <p>内容：{contents}</p>
        </>
    )
});