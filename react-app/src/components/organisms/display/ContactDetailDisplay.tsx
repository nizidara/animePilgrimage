import { FC, memo } from "react"
import { responseContactData } from "../../../type/api/contact";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";

type contactDetailData = Omit<responseContactData, 'status'> & {
    status?: number | null;
}

export const ContactDetailDisplay: FC<contactDetailData> = memo((props) => {
    const {name, email, title, contents, contact_date, status, contact_id, user_id, user_name} = props;

    return (
        <>
            <p>お問い合わせID:{contact_id}</p>
            <p>お問い合わせ日時:<DateTimeFormatter datetime={contact_date} /></p>
            {user_name != null && <p>ユーザー名:{user_name}({user_id})</p>}
            {status != null && <p>お問い合わせ状況:{status}</p>}
            <p>名前：{name}さん</p>
            <p>メール：{email}</p>
            <p>タイトル：{title}</p>
            <p>お問い合わせ内容：{contents}</p>
        </>
    )
});