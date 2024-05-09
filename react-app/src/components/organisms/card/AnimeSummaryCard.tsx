import { FC, memo } from "react"
import { Card, Col, Row } from "react-bootstrap";
import { BsImage } from "react-icons/bs";

type AnimeSummary = {
    title:string;
    introduction:string;
}

export const AnimeSummaryCard: FC<AnimeSummary> = memo((props) => {
    const {title, introduction} = props;
    
    return (
        <>
            <Card>
                <Card.Body>
                        <Row>
                            <Col sm={1}>
                                    <BsImage size={80} />
                            </Col>
                            <Col sm={11}>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        {introduction}
                                    </Card.Text>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </>
    )
});