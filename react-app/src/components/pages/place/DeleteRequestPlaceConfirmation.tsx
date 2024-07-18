import {memo, FC, useCallback} from "react";
import { Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { deletePlaceFormData } from "../../../type/form/place";
import { responsePlaceData } from "../../../type/api/place";
import { useDeleteRequestPlace } from "../../../hooks/places/useDeleteRequestPlace";

export const DeleteRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const deletePlaceFormData = location.state.formData as deletePlaceFormData;
    const place = location.state.place as responsePlaceData;
    const placeId = place.place_id

    const back = useCallback((formData:deletePlaceFormData, placeId:string) => navigate("/delete_place", {state: {formData, placeId}}), [navigate]);
    const {deleteRequest} = useDeleteRequestPlace();

    const onClickBack = () => back(deletePlaceFormData, placeId);
    const onClickSend = () => deleteRequest(deletePlaceFormData, place);

    return (
        <Container>
            <h2>リクエスト内容確認</h2>
            <p>削除リクエスト内容をご確認ください。</p>
            <DeletePlaceDetailDisplay 
                name={place.name}
                anime_title={place.anime_title}
                comment={place.comment}
                anime_id={place.anime_id}
                place_id={place.place_id}
                latitude={place.latitude}
                longitude={place.longitude}
                contents={deletePlaceFormData.contents} 
            />
            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});