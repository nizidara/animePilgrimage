import {memo, FC, useCallback} from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate } from "react-router-dom";
import { commentList, photoDataList, placeData} from "../../../testdatas/testdata";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useGetCommentList } from "../../../hooks/comments/useGetCommentList";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate(`/edit_place`, {state: {placeId}}), [navigate]);
    const onClickDelete = useCallback(() => navigate("/delete_place", {state: {placeId}}), [navigate]);

    const query = useQuery();
    const placeId = query.get('place_id');
    const { place, loading, error } = useGetPlaceDetail(placeId);
    const { commentList, fetchComments } = useGetCommentList(placeId);

    if (loading) {
        return <div>loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!place) {
        return <div>place not found</div>;
    }

    const geojson = convertPlaceListToGeoJson([place]);
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{place.name}</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                    <Button variant="warning" onClick={onClickEdit} className="mx-2">修正</Button> <Button variant="danger" onClick={onClickDelete}>削除</Button>
                </Col>
            </Row>

            <DisplayMap geojson={geojson} />

            <PlaceSummaryCard 
                name={place.name} 
                title={place.anime_title} 
                comment={place.comment} 
                anime_id={place.anime_id} 
                place_id={place.place_id}
                file_name={place.file_name}
            />
            <ListGroup horizontal>
                {photoDataList.map(photo => (
                    <ListGroup.Item key={photo.src}>
                        <PhotoCard title={photo.animeTitle} name={photo.name} src={photo.src} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            <CommentForm onCommentPosted={fetchComments} placeId={place.place_id} />
            <ListGroup>
                {commentList.map(comment => (
                    <ListGroup.Item key={comment.comment_id}>
                        <CommentCard comment={comment} buttonFlag={true} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
        </Container>
    )
});