import {memo, FC, useState, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
import { responseContactData } from "../../../type/api/contact";

export const ContactResult: FC = memo(() =>{
    const location = useLocation();
    const navigate = useNavigate();
    
    const responseData = location.state.responseData as responseContactData;

    const onClickGuide = useCallback(() => navigate("/guide"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>お問い合わせが完了しました</h2>
            <ContactDetailDisplay 
                contact_id={responseData.contact_id} 
                name={responseData.name} 
                email={responseData.email} 
                title={responseData.title} 
                contents={responseData.contents} 
                contact_date={responseData.contact_date} 
            />

            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" onClick={onClickTop}>アニメ情報に戻る</Button>
                </Col>
            </Row>

            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" onClick={onClickGuide}>利用ガイド</Button>
                </Col>
            </Row>
        </Container>
    )
});