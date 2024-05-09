import { FC, memo, useCallback } from "react"
import { Button, Card, Col, Row } from "react-bootstrap";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type PlaceSummary = {
    name:string;
    title:string;
    comment:string;
}

export const PlaceSummaryCard: FC<PlaceSummary> = memo((props) => {
    const navigate = useNavigate();

    const {name, title, comment} = props;

    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);

    return (
        <>
            <Card>
                <Card.Body>
                        <Row>
                            <Col sm={1}>
                                    <BsImage size={80} />
                            </Col>
                            <Col sm={11}>
                                    <Card.Title className="d-flex justify-content-between">{name} <Button variant="outline-primary" className="float-right" onClick={onClickAnime}>#{title}</Button></Card.Title>
                                    <Card.Text>
                                        {comment}
                                    </Card.Text>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
            
        </>
    )
});