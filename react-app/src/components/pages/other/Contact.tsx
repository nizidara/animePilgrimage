import {memo, FC} from "react";
import { ContactForm } from "../../organisms/forms/ContactForm";
import { Container } from "react-bootstrap";

export const Contact: FC = memo(() =>{
    return (
        <Container>
            <h1>お問い合わせページです．</h1>
            <ContactForm />
        </Container>
        
    )
});