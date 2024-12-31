import { memo, FC, useCallback } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { ContactSummaryCard } from "../../organisms/card/ContactSummaryCard";
import { useGetContactList } from "../../../hooks/contacts/useGetContactList";
import { useNavigate } from "react-router-dom";

export const AdminContactList: FC = memo(() =>{
    const { contacts, loading, error } = useGetContactList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((contactId: number) => navigate(`/admin/contact?contact_id=${contactId}`), [navigate]);

    return (
        <Container>
            <h2>Adminお問い合わせ内容一覧</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
                <ListGroup>
                    {contacts.map(contact => (
                    <ListGroup.Item key={contact.contact_id}>
                        <ContactSummaryCard 
                            name={contact.name} 
                            email={contact.email} 
                            title={contact.title} 
                            contents={contact.contents} 
                            contact_date={contact.contact_date} 
                            status={contact.status} 
                            contact_id={contact.contact_id} 
                            user_id={contact.user_id} 
                            user_name={contact.user_name}
                            onClickDetail={onClickDetail}
                        />
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </Container>
    )
});