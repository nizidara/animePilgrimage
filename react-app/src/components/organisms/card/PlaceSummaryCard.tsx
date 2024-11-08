import { FC, memo, useCallback } from "react"
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import '../../../thema/card/CardStyles.css';
import { Icon } from "../../atoms/Icon";

type PlaceSummary = {
    name:string;
    title:string;
    comment?:string | null;
    anime_id:number;
    onClickDetail?: (placeId: string) => void;
    place_id: string;
    place_icon?: string | null;
}

export const PlaceSummaryCard: FC<PlaceSummary> = memo((props) => {
    const navigate = useNavigate();

    const {name, title, comment, anime_id, onClickDetail, place_id, place_icon} = props;

    const onClickAnime = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);

    return (
        <>
            <Card>
                {onClickDetail ? (
                    <Card.Body className="clickable-card" onClick={() => onClickDetail(place_id)}>
                        <Row>
                            <Col xs="auto" sm="auto">
                                <Icon file_name={place_icon} />
                            </Col>
                            <Col>
                                    <Card.Title>{name}</Card.Title> 
                                    <Card.Text>
                                        {comment != null && comment}
                                    </Card.Text>
                                    
                            </Col>
                        </Row>
                    </Card.Body>
                ) : (
                    <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                <Icon file_name={place_icon} />
                            </Col>
                            <Col>
                                    <Card.Title>{name}</Card.Title> 
                                    <Card.Text>
                                        {comment != null && comment}
                                    </Card.Text>
                                    
                            </Col>
                        </Row>
                </Card.Body>
                )}
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Button variant="link" onClick={() => onClickAnime(anime_id)} size="sm">#{title}</Button>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
});