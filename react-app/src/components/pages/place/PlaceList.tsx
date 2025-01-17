import { memo, FC, useCallback, useState, useEffect } from "react";
import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";
import { BsXCircle } from "react-icons/bs";
import { responseRealPhotoData } from "../../../type/api/photo";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../../organisms/map/DummyMap";
import { PhotoListDisplay } from "../../organisms/display/PhotoListDisplay";

export const PlaceList: FC = memo(() =>{
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const animeId = searchParams.get('anime_id');
    const name = location.state?.name ? location.state.name : null;
    const regionId = location.state?.regionId ? location.state.regionId : null;
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const currentPage = 1;
    const pageSize = 200;

    const { anime, error:animeError } = useGetAnimeDetail(animeId);
    const { placeList, loading:PlaceListLoading, error:placeListError } = useGetPlaceList(name, animeId, regionId, currentPage, pageSize);
    const geojson = convertPlaceListToGeoJson(placeList);

    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const [realPhotoList, setRealPhotoList] = useState<responseRealPhotoData[] | null>(null);

    const selectedPlace = placeList.find(place => place.place_id === selectedPlaceId);
    const selectedPlacePhotoPage = 1;
    const selectedPhotoPageSize = 12;
    const { realPhotoList: fetchedRealPhotoList, loading:realPhotoListLoading, error:realPhotoListError } = useGetRealPhotoList(selectedPlace ? selectedPlace.place_id : null, selectedPlacePhotoPage, selectedPhotoPageSize, true);

    const onClickAnime = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate, animeId]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);
 
    const handleMarkerClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleXClick = () => {
        setSelectedPlaceId(null);
    };

    useEffect(() => {
        if (selectedPlace && fetchedRealPhotoList) {
            setRealPhotoList(fetchedRealPhotoList);
        }
    }, [selectedPlace, fetchedRealPhotoList]);
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                {animeId && animeError && <Alert variant="danger">{animeError}</Alert>}
                <Col xs={4}>
                    <h2>聖地一覧</h2>
                </Col>
                <Col xs={8} className="d-flex justify-content-end align-items-center">
                    {anime != null && <Button variant="outline-primary" onClick={() => onClickAnime(anime.anime_id)}>#{anime.title}</Button>}
                </Col>
            </Row>

            {geojson.features.length !== 0 && 
                mapboxFlag ? 
                    <DisplayMap geojson={geojson} onMarkerClick={handleMarkerClick} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]}/>
                    : <DummyMap />
            }
            {selectedPlace && (
                <>
                    <div className="position-relative m-1">
                        <PlaceSummaryCard 
                            name={selectedPlace.name} 
                            title={selectedPlace.anime_title} 
                            comment={selectedPlace.comment} 
                            anime_id={selectedPlace.anime_id} 
                            place_id={selectedPlace.place_id}
                            onClickDetail={onClickDetail}
                        />
                        <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={handleXClick}>×</Button>
                    </div>
                    {realPhotoListError && <Alert variant="danger">{realPhotoListError}</Alert>}
                    {realPhotoListLoading && <center><Spinner animation="border" /></center>}
                    {realPhotoList && realPhotoList.length !== 0 &&
                        <div>
                            <p className="mt-3">現地写真（みんなの投稿）</p>
                            <PhotoListDisplay realPhotoList={realPhotoList} />
                        </div>}
                </>
            )}
            <hr />
            
            <div className="d-flex justify-content-end mb-2">
                <Button variant="success" onClick={onClickRegisterPlace}>登録</Button>
            </div>
            {placeListError && <Alert variant="danger">{placeListError}</Alert>}
            {PlaceListLoading ? <center><Spinner animation="border" /></center>:
                <ListGroup>
                    {placeList.map(place => (
                        <ListGroup.Item key={place.place_id}>
                            <PlaceSummaryCard 
                                name={place.name} 
                                title={place.anime_title} 
                                comment={place.comment} 
                                onClickDetail={onClickDetail} 
                                anime_id={place.anime_id} 
                                place_id={place.place_id}
                                place_icon={place.place_icon}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
            
        </Container>
    )
});