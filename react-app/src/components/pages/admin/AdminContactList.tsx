import {memo, FC, useCallback} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { ContactSummaryCard } from "../../organisms/card/ContactSummaryCard";
import { useGetContactList } from "../../../hooks/contacts/useGetContactList";
import { useNavigate } from "react-router-dom";

export const AdminContactList: FC = memo(() =>{
    const { contacts, loading, error } = useGetContactList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((contactId: number) => navigate(`/admin/contact?contact_id=${contactId}`), [navigate]);

    // if (loading) return <p>読み込み中...</p>;
    // if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h2>Adminお問い合わせ内容一覧</h2>

            <ListGroup>
                {contacts.map(contact => (
                <ListGroup.Item key={contact.contact_id}>
                    <ContactSummaryCard contact_id={contact.contact_id} name={contact.name} email={contact.email} title={contact.title} contents={contact.contents} contact_date={contact.contact_date} user_id={contact.user_id} status={contact.status} onClickDetail={onClickDetail}/>
                </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});