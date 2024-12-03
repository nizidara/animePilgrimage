import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responsePlaceData } from "../../../type/api/place";

export const RegisterPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responsePlaceData;
    const placeId = responseData.place_id;
    const animeId = responseData.anime_id;

    const onClickRegisterPlace = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate, animeId]);
    const onClickPlace = useCallback(() => navigate(`/place?place_id=${placeId}`), [navigate, placeId]);
    const onClickAnime = useCallback(() => navigate(`/anime?anime_id=${animeId}`), [navigate, animeId]);

    return (
        <Container>
            <h2 className="mt-2">聖地の登録が完了しました</h2>
            <RegisterPlaceDetailDisplay 
                name={responseData.name} 
                anime_title={responseData.anime_title} 
                region_name={responseData.region_name}
                latitude={responseData.latitude}
                longitude={responseData.longitude}
                comment={responseData.comment} 
                place_icon={responseData.place_icon}
                anime_icon={responseData.anime_icon}
                file_names={responseData.file_names}
            />

            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={onClickRegisterPlace}>続けて聖地を登録</Button>
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={onClickAnime}>アニメ情報</Button>
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={onClickPlace}>聖地情報</Button>
                </Col>
            </Row>
        </Container>
    )
});