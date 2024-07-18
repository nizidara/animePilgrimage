import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlaceFormData } from "../../../type/form/place";
import { responseRequestPlaceData } from "../../../type/api/place";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseRequestPlaceData;
    const placeId = responseData.place_id;

    const onClickPlace = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>削除リクエストを送信しました</h2>

            <DeletePlaceDetailDisplay 
                name={responseData.name}
                anime_title={responseData.anime_title}
                comment={responseData.comment}
                anime_id={responseData.anime_id}
                place_id={responseData.place_id}
                latitude={responseData.latitude}
                longitude={responseData.longitude}
                contents={responseData.contents} 
                request_place_id={responseData.request_place_id}
                request_date={responseData.request_date}
            />

            <center>
            <Button variant="primary" onClick={() => onClickPlace(placeId)} className="mt-2">聖地情報に戻る</Button><br />
            <Button variant="primary" onClick={onClickTop} className="mt-2">TOPへ</Button>
            </center>
        </Container>
    )
});