import { ChangeEvent, FC, FormEvent, KeyboardEvent, memo, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useSendContact } from "../../../hooks/contacts/useSendContact";
import { sendContactFormData } from "../../../type/form/contact";


export const ContactForm: FC = memo(() => {
    const {send} = useSendContact();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeEmail = (e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onChangeContents = (e:ChangeEvent<HTMLInputElement>) => setContents(e.target.value);
    
    const sendContents = {name, email, title, contents} as sendContactFormData;
    const onClickSend = (e: FormEvent) => {
        e.preventDefault();
        send(sendContents);
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <Form onSubmit={onClickSend} onKeyDown={handleKeyDown}>
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
                    <Form.Control required as="textarea" rows={3} value={contents} maxLength={10000} onChange={onChangeContents} />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">送信</Button>
                </div>
            </Form>
            
        </>
    )
});