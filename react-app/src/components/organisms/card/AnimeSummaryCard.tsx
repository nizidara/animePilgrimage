import { FC, memo } from "react"
import { Card, Col, Row } from "react-bootstrap";

import '../../../thema/card/CardStyles.css';
import { responseAnimeData } from "../../../type/api/anime";
import { Icon } from "../../atoms/Icon";

type AnimeSummaryData = responseAnimeData & {
    onClickDetail: (animeId: number) => void;
}

export const AnimeSummaryCard: FC<AnimeSummaryData> = memo((props) => {
    const {title, introduction, onClickDetail, anime_id, file_name} = props;
    
    return (
        <>
            <Card className="clickable-card" onClick={() => onClickDetail(anime_id)}>
                <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                    <Icon file_name={file_name} />
                            </Col>
                            <Col>
                                    <Card.Title>{title}</Card.Title>
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