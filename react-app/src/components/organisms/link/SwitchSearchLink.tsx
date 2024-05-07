import { FC, memo, useCallback } from "react"
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
    flag : number;
}

export const SwitchSearchLink: FC<Props> = memo((props) => {

    const navigate = useNavigate();

    const onClickSearchAnime = useCallback(() => navigate("/search/anime"), [navigate]);
    const onClickSearchPlace = useCallback(() => navigate("/search/place"), [navigate]);

    const animeSearchButton = props.flag === 0 ? <Button variant="primary" size="lg" onClick={onClickSearchAnime}>アニメ検索</Button> : <Button variant="outline-primary" size="lg" onClick={onClickSearchAnime}>アニメ検索</Button>
    const placeSearchButton = props.flag === 1 ? <Button variant="primary" size="lg" onClick={onClickSearchPlace}>聖地検索</Button> : <Button variant="outline-primary" size="lg" onClick={onClickSearchPlace}>聖地検索</Button>

    return (
        <>
            <hr />
            <Row>
                <Col xs={6} className="d-flex justify-content-center align-items-center">
                    {animeSearchButton}
                </Col>
                <Col xs={6} className="d-flex justify-content-center align-items-center">
                    {placeSearchButton}
                </Col>
            </Row>
            <hr />
        </>
    )
});