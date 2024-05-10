import {memo, FC, useState, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { responseSendContents } from "../../../type/api/contact";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";

export const ContactResult: FC = memo(() =>{
    const location = useLocation();
    const navigate = useNavigate();
    
    const responseSendContents = location.state.responseSendContents as responseSendContents;

    const onClickGuide = useCallback(() => navigate("/guide"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>お問い合わせ完了しました</h2>
            <ContactDetailDisplay id={responseSendContents.id} name={responseSendContents.name} email={responseSendContents.email} title={responseSendContents.title} contents={responseSendContents.contents} />

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