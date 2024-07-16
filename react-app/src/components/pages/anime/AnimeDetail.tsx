import {memo, FC, useCallback} from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";
import { placeList } from "../../../testdatas/testdata";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";

export const AnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_anime"), [navigate]);
    const onClickMap = useCallback(() => navigate("/place/list"), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place"), [navigate]);

    const query = useQuery();
    const animeId = query.get('anime_id');
    const { anime, loading, error } = useGetAnimeDetail(animeId);
    const { placeList } = useGetPlaceList();

    if (loading) {
        return <div></div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!anime) {
        return <div>No contact found</div>;
    }

    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{anime.title}</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                <Button variant="warning" onClick={onClickEdit}>修正</Button>
                </Col>
            </Row>
            <AnimeIntroductionDisplay 
                title={anime.title} 
                introduction={anime.introduction} 
                flag={anime.flag}
                kana={anime.kana}
                anime_id={anime.anime_id}
            />
            <hr />

            <div className="d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={onClickMap} className="mx-2">MAPを見る</Button> <Button variant="success" onClick={onClickRegister}>登録</Button>
            </div> 
            <ListGroup>
                {placeList.map(place => (
                    <ListGroup.Item key={place.place_id}>
                        <PlaceSummaryCard name={place.name} title={String(place.anime_id)} comment={place.comment} anime_id={place.anime_id} place_id={place.place_id}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});