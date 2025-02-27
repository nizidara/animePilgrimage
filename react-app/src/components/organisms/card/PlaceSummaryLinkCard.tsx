import { FC, memo } from "react"
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import '../../../thema/card/CardStyles.css';
import { Icon } from "../../atoms/Icon";
import { FlagBadge } from "../../atoms/FlagBadge";

type PlaceSummary = {
    name:string;
    title:string;
    comment?:string | null;
    anime_id:number;
    place_id: string;
    place_icon?: string | null;
    flag?: number | null;
}

export const PlaceSummaryLinkCard: FC<PlaceSummary> = memo((props) => {
    const {name, title, comment, anime_id, place_id, place_icon, flag} = props;

    return (
        <>
            <Card>
                <Link to={`/place?place_id=${place_id}`} className="clickable-card-link">
                    <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                <Icon file_name={place_icon} />
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>{name}</Card.Title>
                                    {(flag === 0 || flag === 2 || flag === 9) && <FlagBadge flag={flag} />}
                                </div> 
                                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                    {comment != null && comment}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Link>
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Link to={`/anime?anime_id=${anime_id}`} className="btn btn-link btn-sm" style={{ display: "block", textAlign: "right" }}>#{title}</Link>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
});