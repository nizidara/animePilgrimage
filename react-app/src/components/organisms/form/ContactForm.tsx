import { ChangeEvent, FC, FormEvent, KeyboardEvent, memo, useState } from "react"
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useSendContact } from "../../../hooks/contacts/useSendContact";
import { sendContactFormData } from "../../../type/form/contact";


export const ContactForm: FC = memo(() => {
    const { send, sendError } = useSendContact();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeContents = (e:ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value);
    
    const sendContents = {name, email, title, contents} as sendContactFormData;
    const onClickSend = (e: FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        send(sendContents, () => setIsSubmitting(false));
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
            e.preventDefault();
        }
    };

    return (
        <>
            <Form onSubmit={onClickSend} onKeyDown={handleKeyDown}>
                {sendError && <Alert variant="danger">{sendError}</Alert>}
                <Form.Group className="mb-3" controlId="contactFormName">
                    <Form.Label>名前※</Form.Label>
                    <Form.Control required type="text" value={name} maxLength={20} onChange={onChangeName} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="contactFormEmail">
                    <Form.Label>メールアドレス※</Form.Label>
                    <Form.Control required type="email" placeholder="aaa@example.com" maxLength={256} value={email} onChange={onChangeEmail} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormTitle">
                    <Form.Label>題名※</Form.Label>
                    <Form.Control required value={title} maxLength={100} onChange={onChangeTitle}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormContents">
                    <Form.Label>メッセージ本文※</Form.Label>
                    <Form.Control required as="textarea" value={contents} maxLength={10000} onChange={onChangeContents} rows={5} />
                </Form.Group>
                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Button variant="primary" type="submit" disabled={isSubmitting} >
                            {isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "送信" }
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
});