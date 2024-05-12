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
                            <Col xs="auto" sm="auto">
                                    <BsImage size={80} />
                            </Col>
                            <Col>
                                    <Card.Title>{name}</Card.Title> 
                                    <Card.Text>
                                        {comment}
                                    </Card.Text>
                                    
                            </Col>
                        </Row>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="link" onClick={onClickAnime} size="sm">#{title}</Button>
                    </div>
                </Card.Footer>
            </Card>
            
        </>
    )
});