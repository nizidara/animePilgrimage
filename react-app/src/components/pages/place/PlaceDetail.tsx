import {memo, FC, useCallback} from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate } from "react-router-dom";
import { commentList, photoDataList, placeData} from "../../../testdatas/testdata";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_place"), [navigate]);
    const onClickDelete = useCallback(() => navigate("/delete_place"), [navigate]);

    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{placeData.name}</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                    <Button variant="warning" onClick={onClickEdit} className="mx-2">修正</Button> <Button variant="danger" onClick={onClickDelete}>削除</Button>
                </Col>
            </Row>

            <DisplayMap />

            <PlaceSummaryCard name={placeData.name} title={placeData.animeTitle} comment={placeData.comment} />
            <ListGroup horizontal>
                {photoDataList.map(photo => (
                    <ListGroup.Item key={photo.src}>
                        <PhotoCard title={photo.animeTitle} name={photo.name} src={photo.src} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <CommentForm />
            <ListGroup>
                {commentList.map(comment => (
                    <ListGroup.Item key={comment.comment_id}>
                        <CommentCard user_name={comment.user_name} comment_date={comment.comment_date} comment={comment.comment} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
        </Container>
    )
});