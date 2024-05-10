import { FC, memo } from "react"
import { responseSendContents } from "../../../type/api/contact";


export const ContactDetailDisplay: FC<responseSendContents> = memo((props) => {
    const {id, name, email, title, contents} = props;

    return (
        <>
            <p>id:{id}</p>
            <p>名前：{name}さん</p>
            <p>メール：{email}</p>
            <p>タイトル：{title}</p>
            <p>内容：{contents}</p>
        </>
    )
});