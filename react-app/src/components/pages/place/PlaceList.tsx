import { memo, FC, useState, useEffect } from "react";
import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { convertPlaceListToGeoJson } from "../../../utilities/mapbox/convertPlaceListToGeoJson";
import { responseRealPhotoData } from "../../../type/api/photo";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../../organisms/map/DummyMap";
import { PhotoListDisplay } from "../../organisms/display/PhotoListDisplay";
import { Helmet } from "react-helmet-async";
import { PlaceSummaryLinkCard } from "../../organisms/card/PlaceSummaryLinkCard";

export const PlaceList: FC = memo(() =>{    
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

    const structData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${anime ? anime.title : ""}聖地MAP`,
        "description": `${anime ? anime.title : ""}聖地MAP・聖地情報の一覧`,
        "image": anime && anime.file_name,
        "url": animeId ? `https://pilgrimage.nizidara.com/place/list?anime_id=${animeId}` : `https://pilgrimage.nizidara.com/place/list"`,
        "itemListElement": placeList.slice(0, 100).map((place, index) => ({  // 上位100件のみ
            "@type": "ListItem",
            "position": index + 1,
            "name": place.name,
            "description": place.comment,
            "image": place.place_icon,
            "url": `https://pilgrimage.nizidara.com/place?place_id=${place.place_id}`
        }))
    }
    
    return (
        <>
            <Helmet>
                <title>{anime ? `${anime.title} 聖地MAP` : `聖地MAP`}</title>
                <meta name="description" content={`${anime ? anime.title : ""}聖地MAP・聖地情報の一覧ページ - にじげんたび 聖地巡礼`} />
                <meta property="og:title" content={`${anime ? anime.title : ""}聖地MAP - にじげんたび 聖地巡礼`} />
                <meta property="og:description" content={`${anime ? anime.title: ""} 聖地MAP・聖地情報の一覧ページ - にじげんたび 聖地巡礼`} />
                {anime && anime.file_name && <meta property="og:image" content={anime.file_name} />}
                {anime && anime.file_name && <meta name="twitter:image" content={anime.file_name} />}
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <Row className="mt-2 mb-2">
                    {animeId && animeError && <Alert variant="danger">{animeError}</Alert>}
                    <Col xs={4}>
                        <h2>聖地一覧</h2>
                    </Col>
                    <Col xs={8} className="d-flex justify-content-end align-items-center">
                        {anime != null && <Link to={`/anime?anime_id=${animeId}`}><Button variant="outline-primary" style={{ textAlign: "right" }}>#{anime.title}</Button></Link>}
                    </Col>


                </Row>

                {mapboxFlag ? 
                    (geojson.features.length !== 0 &&
                        <DisplayMap geojson={geojson} onMarkerClick={handleMarkerClick} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} defaultZoom={12} />
                    )
                        : <DummyMap />
                }
                {selectedPlace && (
                    <>
                        <div className="position-relative m-1">
                            <PlaceSummaryLinkCard 
                                name={selectedPlace.name} 
                                place_icon={selectedPlace.place_icon}
                                title={selectedPlace.anime_title} 
                                comment={selectedPlace.comment} 
                                anime_id={selectedPlace.anime_id} 
                                place_id={selectedPlace.place_id}
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
                    <Link to={"/register_place"} state = {{animeId}}><Button variant="success">登録</Button></Link>
                </div>
                {placeListError && <Alert variant="danger">{placeListError}</Alert>}
                {PlaceListLoading ? <center><Spinner animation="border" /></center>:
                    <ListGroup>
                        {placeList.map(place => (
                            <ListGroup.Item key={place.place_id}>
                                <PlaceSummaryLinkCard 
                                    name={place.name} 
                                    title={place.anime_title} 
                                    comment={place.comment} 
                                    anime_id={place.anime_id} 
                                    place_id={place.place_id}
                                    place_icon={place.place_icon}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
                
            </Container>
        </>
    )
});