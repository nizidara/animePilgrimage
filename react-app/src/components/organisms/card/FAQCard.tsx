import { FC, memo } from "react"
import { Accordion } from "react-bootstrap";
import { faqList } from "../../../type/api/other";

export const FAQCard: FC<faqList> = memo((props) => {
    const {faq} = props
    
    return (
        <>
            <Accordion alwaysOpen>
                {faq.map((item, index) => (
                    <Accordion.Item key={index} eventKey={item.question}>
                        <Accordion.Header style={{ whiteSpace: 'pre-line' }}>{item.question}</Accordion.Header>
                        <Accordion.Body style={{ whiteSpace: 'pre-line' }}>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </>
    )
});