import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responseRequestPlaceData } from "../../../type/api/place";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseRequestPlaceData;
    const placeIcon = location.state.placeIcon as string;
    const placeId = responseData.place_id;

    const onClickPlace = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2 className="mt-2">削除リクエストを送信しました</h2>

            <DeletePlaceDetailDisplay 
                name={responseData.name}
                anime_title={responseData.anime_title}
                comment={responseData.comment}
                anime_id={responseData.anime_id}
                place_id={responseData.place_id}
                latitude={responseData.latitude}
                longitude={responseData.longitude}
                place_icon={placeIcon}
                contents={responseData.contents} 
                request_place_id={responseData.request_place_id}
                request_date={responseData.request_date}
                anime_icon={responseData.anime_icon}
            />

            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={() => onClickPlace(placeId)}>聖地情報に戻る</Button>
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                </Col>
            </Row>
        </Container>
    )
});