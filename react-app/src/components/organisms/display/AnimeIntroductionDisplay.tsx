import { FC, memo } from "react"
import { responseAnimeData } from "../../../type/api/anime";
import { Card, Col, Row } from "react-bootstrap";
import { Icon } from "../../atoms/Icon";

export const AnimeIntroductionDisplay: FC<responseAnimeData> = memo((props) => {
    const {introduction, file_name} = props;
    
    return (
        <>
            <Card>
                <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                <Icon file_name={file_name} />
                            </Col>
                            <Col>
                                    <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                        {introduction}
                                    </Card.Text>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </>
    )
});