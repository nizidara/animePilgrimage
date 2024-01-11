import { FC, memo } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";


export const ContactForm: FC = memo(() => {

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="contactFormName">
                    <Form.Label>名前</Form.Label>
                    <Form.Control />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="contactFormEmail">
                    <Form.Label>メールアドレス</Form.Label>
                    <Form.Control type="email" placeholder="aaa@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormTitle">
                    <Form.Label>題名</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactFormContents">
                    <Form.Label>メッセージ本文</Form.Label>
                    <Form.Control as="textarea" rows={3}/>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" size="lg">送信</Button>
                </div>
            </Form>
            
        </>
    )
});