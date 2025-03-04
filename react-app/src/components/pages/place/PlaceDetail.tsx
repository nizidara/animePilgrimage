import { memo, FC, useCallback, useState, useEffect } from "react";
import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useGetCommentList } from "../../../hooks/comments/useGetCommentList";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../../organisms/map/DummyMap";
import { PaginationControls } from "../../molecules/PaginationControls";
import { PhotoListDisplay } from "../../organisms/display/PhotoListDisplay";
import { useGetAnimePhotoList } from "../../../hooks/photos/useGetAnimePhotoList";
import { OpenGooglemapAppButton } from "../../atoms/OpenGooglemapAppButton";
import { Helmet } from "react-helmet-async";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const placeId = searchParams.get('place_id');

    const [currentCommentPage, setCurrentCommentPage] = useState<number>(1);
    const commentPageSize = 10;
    const [currentAnimePhotoPage, setCurrentAnimePhotoPage] = useState<number>(1);
    const animePhotoPageSize = 12;
    const [currentRealPhotoPage, setCurrentRealPhotoPage] = useState<number>(1);
    const realPhotoPageSize = 12;

    // Step 1: Place detail hook
    const { place, loading: placeLoading, error: placeError } = useGetPlaceDetail(placeId);

    // Step 2: Conditional state for other hooks
    const [canFetchDetails, setCanFetchDetails] = useState(false);

    useEffect(() => {
        // Allow fetching other data only if there are no errors in place detail
        if (!placeLoading && !placeError && place) {
            setCanFetchDetails(true);
        } else {
            setCanFetchDetails(false);
        }
    }, [placeLoading, placeError, place]);

    const { commentList, loading:commentListLoading, error: commentListError, totalCount: commentTotalCount, fetchComments } = useGetCommentList(placeId, currentCommentPage, commentPageSize, canFetchDetails);
    const { animePhotoList, loading: animePhotoListLoading, error: animePhotoListError, totalCount:animePhotoTotalCount } = useGetAnimePhotoList(placeId, currentAnimePhotoPage, animePhotoPageSize, canFetchDetails);
    const { realPhotoList, error: realPhotoListError, totalCount:realPhotoTotalCount } = useGetRealPhotoList(placeId, currentRealPhotoPage, realPhotoPageSize, canFetchDetails);

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

    if (placeLoading) return <center><Spinner animation="border" /></center>;    
    if (placeError) return <Alert variant="danger">{placeError}</Alert>;
    if (!place) return <div>place not found</div>;


    const geojson = convertPlaceListToGeoJson([place]);

    const structData = {
        "@context": "https://schema.org",
        "@type": "Place",
        "name": place.name,
        "description": `${place.anime_title}の${place.name}の聖地情報`,
        "image": place.place_icon,
        "url": `https://pilgrimage.nizidara.com/place?place_id=${place.place_id}`,
        "address": {
            "@type": "PostalAddress",
            "addressRegion": place.region_name,
            "addressLocality": "日本",
            "addressCountry": "JP"
        }
    }
    
    return (
        <>
            <Helmet>
                <title>{place.name}</title>
                <meta name="description" content={`${place.anime_title}の${place.name}の聖地情報 - にじげんたび 聖地巡礼`} />
                <meta property="og:title" content={`${place.name} - にじげんたび 聖地巡礼`} />
                <meta property="og:description" content={`${place.anime_title}の${place.name}の聖地情報 - にじげんたび 聖地巡礼`} />
                {place.place_icon ? <meta property="og:image" content={place.place_icon} /> : place.anime_icon && <meta property="og:image" content={place.anime_icon} />}
                {place.place_icon ? <meta property="twitter:image" content={place.place_icon} /> : place.anime_icon && <meta property="og:image" content={place.anime_icon} />}
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <Row className="mt-2 mb-2">
                    <Col xs={7}>
                        <h2>{place.name}</h2>
                    </Col>
                    <Col xs={5} className="d-flex justify-content-end align-items-center">
                        <Button variant="warning" onClick={onClickEdit} className="mx-2">修正</Button> <Button variant="danger" onClick={onClickDelete}>削除</Button>
                    </Col>
                </Row>

                {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} defaultZoom={15} /> : <DummyMap />}
                <div className="mt-1 mb-1 justify-content-end d-flex">
                    <OpenGooglemapAppButton coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} />
                </div>
                <PlaceSummaryCard 
                    name={place.name} 
                    title={place.anime_title} 
                    comment={place.comment} 
                    anime_id={place.anime_id} 
                    place_id={place.place_id}
                    place_icon={place.place_icon}
                />
                <div className="position-relative m-1">
                    <p className="mt-2">作中写真<Button variant="outline-success" size="sm" onClick={onClickAddPhoto}>+</Button></p>
                    {animePhotoListError && <Alert variant="danger">{animePhotoListError}</Alert>}
                    {animePhotoListLoading && <center><Spinner animation="border" /></center>}
                    {animePhotoTotalCount > 0 && 
                        <>
                            <PhotoListDisplay animePhotoList={animePhotoList} />
                            <PaginationControls currentPage={currentAnimePhotoPage} totalPages={totalAnimePhotoPages} onPrevious={handleAnimePhotoPrevious} onSelect={handleAnimePhotoPageSelect} onNext={handleAnimePhotoNext} />
                        </>
                    }
                    {realPhotoListError && <Alert variant="danger">{realPhotoListError}</Alert>}
                    {realPhotoTotalCount > 0 &&
                        <div>
                            <p className="mt-5">現地写真（みんなの投稿）</p>
                            <PhotoListDisplay realPhotoList={realPhotoList} />
                            <PaginationControls currentPage={currentRealPhotoPage} totalPages={totalRealPhotoPages} onPrevious={handleRealPhotoPrevious} onSelect={handleRealPhotoPageSelect} onNext={handleRealPhotoNext} />
                        </div>
                    }
                </div>
                
                <CommentForm onCommentPosted={fetchComments} placeId={place.place_id} />
                {commentListError && <Alert variant="danger">{commentListError}</Alert>}
                {commentListLoading ? <center><Spinner animation="border" /></center> :
                    <ListGroup>
                        {commentList.map(comment => (
                            <ListGroup.Item key={comment.comment_id}>
                                <CommentCard comment={comment} buttonFlag={true} />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
                {commentTotalCount > 0 && 
                    <PaginationControls currentPage={currentCommentPage} totalPages={commentTotalPages} onPrevious={handleCommentPrevious} onSelect={handleCommentPageSelect} onNext={handleCommentNext} />
                }
                
            </Container>
        </>
    )
});