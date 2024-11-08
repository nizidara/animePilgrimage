import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
import { useNavigate } from "react-router-dom";
import { useGetContactDetail } from "../../../hooks/contacts/useGetContactDetail";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useQuery } from "../../../hooks/utilities/useQuery";

export const AdminContactDetail: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const query = useQuery();
    const contactId = query.get('contact_id');
    const { contact, loading, error } = useGetContactDetail(contactId);

    if (loading) {
        return <div></div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!contact) {
        return <div>No contact found</div>;
    }

    return (
        <Container>
            <h2>お問い合わせ内容詳細</h2>
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
            <BackAndNextButtons backName="戻る" nextName="TOPへ" onClickBack={onClickBack} onClickNext={onClickTop} />
        </Container>
    )
});