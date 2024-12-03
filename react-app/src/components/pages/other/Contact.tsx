import { memo, FC } from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";

export const Contact: FC = memo(() =>{
    return (
        <Container>
            <h2 className="mt-2">お問い合わせ</h2>
            <ContactForm />
        </Container>
        
    )
});