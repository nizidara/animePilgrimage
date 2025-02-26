import { memo, FC, useCallback } from "react";
import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { Helmet } from "react-helmet-async";

export const AnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const animeId = searchParams.get('anime_id');
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const currentPage = 1;
    const pageSize = 200;

    const { anime, loading: animeLoading, error: animeError } = useGetAnimeDetail(animeId);
    const { placeList, loading: placeListLoading, error: placeListError } = useGetPlaceList(undefined, animeId, undefined, currentPage, pageSize);

    const onClickEdit = useCallback((animeId: number) => navigate(`/edit_anime`, {state: {animeId}}), [navigate]);
    const onClickMap = useCallback((animeId: number) => navigate(`/place/list?anime_id=${animeId}`), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate, animeId]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);
    
    if (animeError) return <Alert variant="danger">{animeError}</Alert>;
    if (animeLoading) return <center><Spinner animation="border" /></center>;
    
    if (!anime) {
        return <div>No anime found</div>;
    }

    const structData = {
        "@context": "https://schema.org",
        "@type": "TVSeries",
        "name": anime.title,
        "description": `${anime.title}の聖地情報一覧`,
        "image": anime.file_name,
        "url": `https://pilgrimage.nizidara.com/anime?anime_id=${animeId}`,
        "hasPart": placeList.slice(0, 10).map(place => ({  // 上位10件のみ
            "@type": "Place",
            "name": place.name,
            "description": place.comment,
            "image": place.place_icon,
            "address": {
            "@type": "PostalAddress",
            "addressRegion": place.region_name,
            "addressLocality": "日本",
            "addressCountry": "JP"
            },
            "url": `https://pilgrimage.nizidara.com/place?${place.place_id}`
        }))
    }

    return (
        <>
            <Helmet>
                <title>{anime.title}</title>
                <meta name="description" content={`${anime.title}の聖地情報 - にじげんたび`} />
                <meta property="og:title" content={`${anime.title} - にじげんたび`} />
                <meta property="og:description" content={`${anime.title}の聖地情報 - にじげんたび`} />
                {anime.file_name && <meta property="og:image" content={anime.file_name} />}
                {anime.file_name && <meta name="twitter:image" content={anime.file_name} />}
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <Row className="mt-2 mb-2">
                    <Col xs={9}>
                        <h2>{anime.title}</h2>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end align-items-center">
                    <Button variant="warning" onClick={() => onClickEdit(anime.anime_id)}>修正</Button>
                    </Col>
                </Row>
                <AnimeIntroductionDisplay 
                    title={anime.title} 
                    introduction={anime.introduction} 
                    flag={anime.flag}
                    kana={anime.kana}
                    anime_id={anime.anime_id}
                    file_name={anime.file_name}
                />
                <hr />

                {placeListError && <Alert variant="danger">{placeListError}</Alert>}
                <div className="d-flex justify-content-end mb-2">
                    <Button variant="primary" onClick={() => onClickMap(anime.anime_id)} className="mx-2" disabled={placeList.length === 0}>MAPを見る</Button> <Button variant="success" onClick={onClickRegister}>登録</Button>
                </div> 

                {placeListLoading ? <center><Spinner animation="border" /></center>:
                    <ListGroup>
                        {placeList.map(place => (
                            <ListGroup.Item key={place.place_id}>
                                <PlaceSummaryCard 
                                    name={place.name} 
                                    title={place.anime_title} 
                                    comment={place.comment} 
                                    anime_id={place.anime_id} 
                                    place_id={place.place_id}
                                    onClickDetail={onClickDetail}
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