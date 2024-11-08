import { memo, FC } from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";

export const Contact: FC = memo(() =>{
    return (
        <Container>
            <h1>お問い合わせ</h1>
            <ContactForm />
        </Container>
        
    )
});