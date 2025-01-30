import { memo, FC, useCallback, useRef } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetContactDetail } from "../../../hooks/contacts/useGetContactDetail";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { UpdateContactStatusForm } from "../../organisms/form/UpdateContactStatusForm";
import { useAdminDeleteContact } from "../../../hooks/contacts/useAdminDeleteContact";

export const AdminContactDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const contactId = searchParams.get('contact_id');

    const { contact, loading, error, fetchContactDetail } = useGetContactDetail(contactId);
    const { deleteContact, deleteError } = useAdminDeleteContact();

    const onClickDelete = (contactId: string) => {deleteContact(contactId)};

    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const contactStatusRef = useRef<HTMLFormElement>(null);

    if (!contact) {
        return <div>No contact found</div>;
    }

    if (!contactId) {
        return <div>No contact found</div>;
    }

    return (
        <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <h2>お問い合わせ内容詳細</h2>
            {loading ? <center><Spinner animation="border" /></center> :
                <>
                    <UpdateContactStatusForm contactId={contact.contact_id} currentStatus={contact.status} formRef={contactStatusRef} onContactStatusUpdated={fetchContactDetail} />
                    <ContactDetailDisplay 
                        name={contact.name} 
                        email={contact.email} 
                        title={contact.title} 
                        contents={contact.contents} 
                        contact_date={contact.contact_date} 
                        status={contact.status}
                        contact_id={contact.contact_id} 
                        user_id={contact.user_id} 
                        user_name={contact.user_name}
                    />
                </>
                
            }
            {deleteError && <Alert variant="danger">{deleteError}</Alert>}
            <div className="d-flex justify-content-center mt-2">
                <Button variant="danger" onClick={() => onClickDelete(contactId)}>削除</Button>
            </div>
            <BackAndNextButtons backName="戻る" nextName="TOPへ" onClickBack={onClickBack} onClickNext={onClickTop} />
        </Container>
    )
});