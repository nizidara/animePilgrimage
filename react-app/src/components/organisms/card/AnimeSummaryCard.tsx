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
                            <Col sm={1}>
                                    <Icon file_name={file_name} />
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