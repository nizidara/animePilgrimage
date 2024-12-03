import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { responseRequestPlaceData } from "../../../type/api/place";

export const EditRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseRequestPlaceData;
    const animePhoto = location.state.animePhoto as string[];

    const onClickPlace = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2 className="mt-2">修正リクエストを送信しました</h2>

            <EditPlaceDetailDisplay 
                name={responseData.name} 
                anime_title={responseData.anime_title}
                region_name={responseData.region_name}
                latitude={responseData.latitude}
                longitude={responseData.longitude}
                comment={responseData.comment} 
                contents={responseData.contents}
                request_date={responseData.request_date}
                request_place_id={responseData.request_place_id}
                anime_icon={responseData.anime_icon}
                file_names={animePhoto}
            />
            
            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={() => onClickPlace(responseData.place_id)}>聖地情報に戻る</Button>
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