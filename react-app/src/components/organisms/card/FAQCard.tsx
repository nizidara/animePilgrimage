import { FC, memo } from "react"
import { Accordion } from "react-bootstrap";
import { faqList } from "../../../type/api/other";

export const FAQCard: FC<faqList> = memo((props) => {
    const {faq} = props
    
    return (
        <>
            <Accordion alwaysOpen>
                {faq.map((item) => (
                    <Accordion.Item eventKey={item.question}>
                        <Accordion.Header>{item.question}</Accordion.Header>
                        <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
});