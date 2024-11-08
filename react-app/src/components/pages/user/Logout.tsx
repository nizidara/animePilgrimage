import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Logout: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>ログアウトしました</h2>
            
            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                </Col>
            </Row>
        </Container>
    )
});