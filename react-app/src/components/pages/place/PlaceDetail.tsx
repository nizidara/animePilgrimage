import { memo, FC, useCallback, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useGetCommentList } from "../../../hooks/comments/useGetCommentList";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../../organisms/map/DummyMap";
import { PaginationControls } from "../../molecules/PaginationControls";
import { PhotoListDisplay } from "../../organisms/display/PhotoListDisplay";
import { useGetAnimePhotoList } from "../../../hooks/photos/useGetAnimePhotoList";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const query = useQuery();
    const placeId = query.get('place_id');

    const [currentCommentPage, setCurrentCommentPage] = useState<number>(1);
    const commentPageSize = 10;
    const [currentAnimePhotoPage, setCurrentAnimePhotoPage] = useState<number>(1);
    const animePhotoPageSize = 2;
    const [currentRealPhotoPage, setCurrentRealPhotoPage] = useState<number>(1);
    const realPhotoPageSize = 12;

    const { place, loading: placeLoading, error: placeError } = useGetPlaceDetail(placeId);
    const { commentList, totalCount: commentTotalCount, fetchComments } = useGetCommentList(placeId, currentCommentPage, commentPageSize);
    const { animePhotoList, totalCount:animePhotoTotalCount } = useGetAnimePhotoList(placeId, currentAnimePhotoPage, animePhotoPageSize);
    const { realPhotoList, totalCount:realPhotoTotalCount } = useGetRealPhotoList(placeId, currentRealPhotoPage, realPhotoPageSize);

    const commentTotalPages = Math.ceil(commentTotalCount / commentPageSize);
    const totalAnimePhotoPages = Math.ceil(animePhotoTotalCount / animePhotoPageSize);
    const totalRealPhotoPages = Math.ceil(realPhotoTotalCount / realPhotoPageSize);
    
    const onClickEdit = useCallback(() => navigate(`/edit_place`, {state: {placeId}}), [navigate, placeId]);
    const onClickDelete = useCallback(() => navigate("/delete_place", {state: {placeId}}), [navigate, placeId]);
    const onClickAddPhoto = useCallback(() => navigate("/place/photo", {state: {placeId}}), [navigate, placeId]);

    //handle comment
    const handleCommentPrevious = () => {
        setCurrentCommentPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleCommentNext = () => {
        setCurrentCommentPage((prev) => Math.min(prev + 1, commentTotalPages));
    };

    const handleCommentPageSelect = (page: number) => {
        setCurrentCommentPage(page);
    };

    //handle anime photo
    const handleAnimePhotoPrevious = () => {
        setCurrentAnimePhotoPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleAnimePhotoNext = () => {
        setCurrentAnimePhotoPage((prev) => Math.min(prev + 1, totalAnimePhotoPages));
    };

    const handleAnimePhotoPageSelect = (page: number) => {
        setCurrentAnimePhotoPage(page);
    };

    //handle real photo
    const handleRealPhotoPrevious = () => {
        setCurrentRealPhotoPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleRealPhotoNext = () => {
        setCurrentRealPhotoPage((prev) => Math.min(prev + 1, totalRealPhotoPages));
    };

    const handleRealPhotoPageSelect = (page: number) => {
        setCurrentRealPhotoPage(page);
    };

    if (placeLoading) {
        return <div>loading...</div>;
    }
    
    if (placeError) {
        return <div>Error: {placeError}</div>;
    }
    
    if (!place) {
        return <div>place not found</div>;
    }

    const geojson = convertPlaceListToGeoJson([place]);
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={7}>
                    <h2>{place.name}</h2>
                </Col>
                <Col xs={5} className="d-flex justify-content-end align-items-center">
                    <Button variant="warning" onClick={onClickEdit} className="mx-2">修正</Button> <Button variant="danger" onClick={onClickDelete}>削除</Button>
                </Col>
            </Row>

            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} /> : <DummyMap />}

            <PlaceSummaryCard 
                name={place.name} 
                title={place.anime_title} 
                comment={place.comment} 
                anime_id={place.anime_id} 
                place_id={place.place_id}
                place_icon={place.place_icon}
            />
            <div className="position-relative m-1">
                <p>作中写真<Button variant="outline-success" size="sm" onClick={onClickAddPhoto}>+</Button></p>
                
                {animePhotoTotalCount > 0 && 
                    <>
                        <PhotoListDisplay animePhotoList={animePhotoList} />
                        <PaginationControls currentPage={currentAnimePhotoPage} totalPages={totalAnimePhotoPages} onPrevious={handleAnimePhotoPrevious} onSelect={handleAnimePhotoPageSelect} onNext={handleAnimePhotoNext} />
                    </>
                }
                {realPhotoTotalCount > 0 &&
                    <div>
                        <p>現地写真（みんなの投稿）</p>
                        <PhotoListDisplay realPhotoList={realPhotoList} />
                        <PaginationControls currentPage={currentRealPhotoPage} totalPages={totalRealPhotoPages} onPrevious={handleRealPhotoPrevious} onSelect={handleRealPhotoPageSelect} onNext={handleRealPhotoNext} />
                    </div>
                }
            </div>
            
            <CommentForm onCommentPosted={fetchComments} placeId={place.place_id} />
            <ListGroup>
                {commentList.map(comment => (
                    <ListGroup.Item key={comment.comment_id}>
                        <CommentCard comment={comment} buttonFlag={true} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            {commentTotalCount > 0 && 
                <PaginationControls currentPage={currentCommentPage} totalPages={commentTotalPages} onPrevious={handleCommentPrevious} onSelect={handleCommentPageSelect} onNext={handleCommentNext} />
            }
            
        </Container>
    )
});