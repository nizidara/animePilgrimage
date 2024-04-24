import {memo, FC} from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";

export const Guide: FC = memo(() =>{
    return (
        <>
            <Container>
                <h1>FAQ</h1>
                <h2>その他</h2>
                <ContactForm />
            </Container>
        </>
    )
});