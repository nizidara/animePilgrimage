import {memo, FC, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";

export const AnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_anime"), [navigate]);
    const onClickMap = useCallback(() => navigate("/place/list"), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place"), [navigate]);

    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <h2>アニメ詳細ページです．</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                <Button variant="secondary" onClick={onClickEdit}>修正</Button>
                </Col>
            </Row>
            <AnimeIntroductionDisplay title={"リコリコ"} introduction={"さかなー"} />
            <hr />
            <Row>
                <Col xs={12} className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant="primary" onClick={onClickMap}>MAPを見る</Button> <Button variant="secondary" onClick={onClickRegister}>登録</Button>
                </Col>
            </Row>
            <hr />
            <PlaceSummaryCard />
        </Container>
    )
});