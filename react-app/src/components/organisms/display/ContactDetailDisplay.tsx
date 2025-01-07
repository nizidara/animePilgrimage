import { FC, memo } from "react"
import { responseContactData } from "../../../type/api/contact";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { Col, Row } from "react-bootstrap";

type contactDetailData = Omit<responseContactData, 'status'> & {
    status?: number | null;
}

export const ContactDetailDisplay: FC<contactDetailData> = memo((props) => {
    const {name, email, title, contents, contact_date, status, contact_id, user_id, user_name} = props;

    return (
        <>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>お問い合わせID：</b></Col>
                <Col xs={12} md={9}>{contact_id}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>お問い合わせ日時：</b></Col>
                <Col xs={12} md={9}><DateTimeFormatter datetime={contact_date} /></Col>
            </Row>
            {user_name != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>ユーザー名：</b></Col>
                    <Col xs={12} md={9}>{user_name}({user_id})</Col>
                </Row>
            }
            {status != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせ状況：</b></Col>
                    <Col xs={12} md={9}>{status}</Col>
                </Row>
            }
            <Row className="mb-2">
                <Col xs={12} md={3}><b>名前：</b></Col>
                <Col xs={12} md={9}>{name} さん</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>メール：</b></Col>
                <Col xs={12} md={9}>{email}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>タイトル：</b></Col>
                <Col xs={12} md={9}>{title}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>お問い合わせ内容：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{contents}</Col>
            </Row>
        </>
    )
});