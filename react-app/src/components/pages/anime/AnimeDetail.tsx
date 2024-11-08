import { memo, FC, useCallback } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";

export const AnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const query = useQuery();
    const animeId = query.get('anime_id');
    const { anime, loading, error } = useGetAnimeDetail(animeId);
    const { placeList } = useGetPlaceList(undefined, animeId, undefined);

    const onClickEdit = useCallback((animeId: number) => navigate(`/edit_anime`, {state: {animeId}}), [navigate]);
    const onClickMap = useCallback((animeId: number) => navigate(`/place/list?anime_id=${animeId}`), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate, animeId]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    if (loading) {
        return <div>loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!anime) {
        return <div>No anime found</div>;
    }

    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{anime.title}</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
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

            <div className="d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={() => onClickMap(anime.anime_id)} className="mx-2" disabled={placeList.length === 0}>MAPを見る</Button> <Button variant="success" onClick={onClickRegister}>登録</Button>
            </div> 
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
        </Container>
    )
});