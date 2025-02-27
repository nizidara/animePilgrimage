import { FC, memo } from "react"
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
    flag : number;
}

export const SwitchSearchLink: FC<Props> = memo((props) => {
    const animeSearchButton = props.flag === 0 ? 
        <Button variant="primary" size="lg" disabled>アニメ検索</Button> :
        <Link to="/search/anime"><Button variant="outline-primary" size="lg">アニメ検索</Button></Link>
    const placeSearchButton = props.flag === 1 ? 
        <Button variant="primary" size="lg" disabled>聖地検索</Button> : 
        <Link to="/search/place"><Button variant="outline-primary" size="lg">聖地検索</Button></Link>

    return (
        <>
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