import {memo, FC, useCallback} from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { useNavigate } from "react-router-dom";
import { animeTitle, photoDataList, placeData, placeList } from "../../../testdatas/testdata";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";

export const PlaceList: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    const { placeList } = useGetPlaceList();

    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                    <h2>{animeTitle}聖地一覧</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                    <Button variant="outline-primary" onClick={onClickAnime}>#{animeTitle}</Button>
                </Col>
            </Row>

            <DisplayMap />
            <PlaceSummaryCard name={placeData.name} title={placeData.animeTitle} comment={placeData.comment} anime_id={123} place_id="123"/>
            <ListGroup horizontal>
                {photoDataList.map(photo => (
                    <ListGroup.Item key={photo.src}>
                        <PhotoCard title={photo.animeTitle} name={photo.name} src={photo.src} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
            
            <div className="d-flex justify-content-end mb-2">
                <Button variant="success" onClick={onClickRegisterPlace}>登録</Button>
            </div> 
            <ListGroup>
                {placeList.map(place => (
                    <ListGroup.Item key={place.place_id}>
                        <PlaceSummaryCard name={place.name} title={String(place.anime_id)} comment={place.comment} onClickDetail={onClickDetail} anime_id={place.anime_id} place_id={place.place_id}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});