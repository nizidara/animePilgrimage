import {memo, FC, useCallback, useState, useEffect} from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { useLocation, useNavigate } from "react-router-dom";
import { photoDataList, placeData, placeList } from "../../../testdatas/testdata";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";
import { BsXCircle } from "react-icons/bs";
import { responseRealPhotoData } from "../../../type/api/photo";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../../organisms/map/DummyMap";

export const PlaceList: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickAnime = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    const query = useQuery();
    const location = useLocation();
    const animeId = query.get('anime_id');
    const name = location.state?.name ? location.state.name : null;
    const regionId = location.state?.regionId ? location.state.regionId : null;

    const { anime, loading, error } = useGetAnimeDetail(animeId);
    const { placeList } = useGetPlaceList(name, animeId, regionId);
    const geojson = convertPlaceListToGeoJson(placeList);

    const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
    const [realPhotoList, setRealPhotoList] = useState<responseRealPhotoData[] | null>(null);
 
    const handleMarkerClick = (placeId: string) => {
        setSelectedPlaceId(placeId);
    };

    const handleXClick = () => {
        setSelectedPlaceId(null);
    };

    const selectedPlace = placeList.find(place => place.place_id === selectedPlaceId);
    const { realPhotoList: fetchedRealPhotoList } = useGetRealPhotoList(selectedPlace ? selectedPlace.place_id : null);

    useEffect(() => {
        if (selectedPlace && fetchedRealPhotoList) {
            setRealPhotoList(fetchedRealPhotoList);
        }
    }, [selectedPlace, fetchedRealPhotoList]);

    if(animeId){
        if (loading) {
            return <div>Loading...</div>;
        }
            
        if (error) {
            return <div>Error: {error}</div>;
        }
    }
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{anime?.title}聖地一覧</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
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
                    <div className="d-flex justify-content-end mt-2">
                        <BsXCircle onClick={handleXClick}/>
                    </div> 
                    <PlaceSummaryCard 
                        name={selectedPlace.name} 
                        title={selectedPlace.anime_title} 
                        comment={selectedPlace.comment} 
                        anime_id={selectedPlace.anime_id} 
                        place_id={selectedPlace.place_id}
                    />
                    {realPhotoList && <PhotoCard realPhotoList={realPhotoList} />}
                </>
            )}
            <hr />
            
            <div className="d-flex justify-content-end mb-2">
                <Button variant="success" onClick={onClickRegisterPlace}>登録</Button>
            </div> 
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
                            file_name={place.file_name}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});