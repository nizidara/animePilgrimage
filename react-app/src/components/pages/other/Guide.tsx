import { memo, FC } from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";
import { FAQCard } from "../../organisms/card/FAQCard";
import { faq } from "../../../testdatas/testdata";

export const Guide: FC = memo(() =>{
    
    return (
        <>
            <Container>
                <h2 className="mt-2">FAQ</h2>
                <FAQCard faq={faq}/>
                <br />
                <h2>お問い合わせ</h2>
                <ContactForm />
            </Container>
        </>
    )
});