import { FC, memo, useCallback } from "react"
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../atoms/Icon";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { RequestBadge } from "../../atoms/RequestBadge";

import '../../../thema/card/CardStyles.css';

type requestPlaceSummary = {
    request_place_id: number;
    name:string;
    title:string;
    comment?:string | null;
    anime_id:number;
    onClickDetail: (requestPlaceId: number, placeId: string) => void;
    place_id: string;
    place_icon?: string | null;
    request_type: number;
    contents: string;
    request_date: string;
    user_name?: string | null;
    user_id?: string | null;
}

export const RequestPlaceSummaryCard: FC<requestPlaceSummary> = memo((props) => {
    const navigate = useNavigate();

    const {name, title, comment, anime_id, onClickDetail, place_id, place_icon, request_type, contents, request_date, user_id, user_name, request_place_id} = props;

    const onClickAnime = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        {user_name}({user_id})
                    </div>
                    <small className="text-muted"><DateTimeFormatter datetime={request_date} /></small>
                </Card.Header>
                <Card.Body className="clickable-card" onClick={() => onClickDetail(request_place_id, place_id)}>
                    <Row>
                        <Col xs="auto" sm="auto">
                            <Icon file_name={place_icon} />
                        </Col>
                        <Col>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title>{name}</Card.Title>
                                <RequestBadge type={request_type} />
                            </div> 
                            <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                {comment != null && comment}
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
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="link" onClick={() => onClickAnime(anime_id)} size="sm">#{title}</Button>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
});