import { ChangeEvent, FC, memo, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import { sendContents, useSendContact } from "../../../hooks/useSendContact";


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
    
    const sendContents = {name, email, title, contents} as sendContents;
    const onClickSend = () => send(sendContents);

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="contactFormName">
                    <Form.Label>名前</Form.Label>
                    <Form.Control value={name} onChange={onChangeName} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="contactFormEmail">
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type="email" placeholder="aaa@example.com" value={email} onChange={onChangeEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormTitle">
                    <Form.Label>題名</Form.Label>
                    <Form.Control value={title} onChange={onChangeTitle}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormContents">
                    <Form.Label>メッセージ本文</Form.Label>
                    <Form.Control as="textarea" rows={3} value={contents} onChange={onChangeContents}/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
                </div>
            </Form>
            
        </>
    )
});