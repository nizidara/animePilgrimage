import { FC, memo } from "react"
import { Card, Col, Row } from "react-bootstrap";
import { responseEditAnimeData } from "../../../type/api/anime";
import { Icon } from "../../atoms/Icon";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";

import '../../../thema/card/CardStyles.css';

type editAnimeSummaryData = Omit<responseEditAnimeData, 'request_type' > & {
    onClickDetail: (requestAnimeId: number, animeId: number) => void;
}

export const EditAnimeSummaryCard: FC<editAnimeSummaryData> = memo((props) => {
    const {title, introduction, onClickDetail, request_anime_id, anime_id, file_name, request_date, user_id, user_name, contents} = props;
    
    return (
        <>
            <Card className="clickable-card" onClick={() => onClickDetail(request_anime_id, anime_id)}>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        {user_name}({user_id})
                    </div>
                    <small className="text-muted"><DateTimeFormatter datetime={request_date} /></small>
                </Card.Header>
                <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                    <Icon file_name={file_name} />
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>{title}</Card.Title>
                                </div>
                                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                    {introduction}
                                </Card.Text>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>リクエスト理由</Card.Title>
                                </div>
                                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                    {contents}
                                </Card.Text>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </>
    )
});