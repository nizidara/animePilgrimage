import {memo, FC} from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";
import { FAQCard } from "../../organisms/card/FAQCard";

export const Guide: FC = memo(() =>{
    const faq = [
        {question: "Q1.hogehoge1", answer: "A1.fugafuga"},
        {question: "Q2.hogehoge2", answer: "A2.fugafuga"},
        {question: "Q3.hogehoge3", answer: "A3.fugafuga"}
    ]
    return (
        <>
            <Container>
                <h1>FAQ</h1>
                <FAQCard faq={faq}/>
                <br />
                <h2>お問い合わせ</h2>
                <ContactForm />
            </Container>
        </>
    )
});