import {memo, FC, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";

export const EditRequestAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerAnime = location.state.formData as registerAnime;
    
    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>修正リクエストが完了しました</h2>
            <RegisterAnimeDetailDisplay title={registerAnime.title} kana={registerAnime.kana} introduction={registerAnime.introduction} />

            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" onClick={onClickAnime}>アニメ情報に戻る</Button>
                </Col>
            </Row>

            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                </Col>
            </Row>
        </Container>
    )
});