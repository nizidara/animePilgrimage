import { FC, memo } from "react"
import { responseAnimeData } from "../../../type/api/anime";
import { Card, Col, Row } from "react-bootstrap";
import { BsImage } from "react-icons/bs";

export const AnimeIntroductionDisplay: FC<responseAnimeData> = memo((props) => {
    const {introduction} = props;
    
    return (
        <>
            <Card>
                <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                    <BsImage size={80} />
                            </Col>
                            <Col>
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