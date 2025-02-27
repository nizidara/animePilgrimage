import { FC, memo } from "react"
import { Card, Col, Row } from "react-bootstrap";

import '../../../thema/card/CardStyles.css';
import { responseAnimeData } from "../../../type/api/anime";
import { Icon } from "../../atoms/Icon";
import { FlagBadge } from "../../atoms/FlagBadge";
import { Link } from "react-router-dom";

export const AnimeSummaryLinkCard: FC<responseAnimeData> = memo((props) => {
    const {title, introduction, anime_id, file_name, flag} = props;
    
    return (
        <Link to={`/anime?anime_id=${anime_id}`} className="clickable-card-link">
            <Card>
                <Card.Body>
                        <Row>
                            <Col xs="auto" sm="auto">
                                    <Icon file_name={file_name} />
                            </Col>
                            <Col>
                                <div className="d-flex justify-content-between align-items-center">
                                    <Card.Title>{title}</Card.Title>
                                    <FlagBadge flag={flag} />
                                </div>
                                <Card.Text style={{ whiteSpace: 'pre-line' }}>
                                    {introduction}
                                </Card.Text>
                            </Col>
                        </Row>
                </Card.Body>
            </Card>
        </Link>
    )
});