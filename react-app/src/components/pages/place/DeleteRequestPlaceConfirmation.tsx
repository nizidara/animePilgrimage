import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlace } from "../../../type/api/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const DeleteRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const deletePlace = location.state.formData as deletePlace;

    const back = useCallback((formData:deletePlace) => navigate("/delete_place", {state: {formData}}), [navigate]);
    const send = useCallback((formData:deletePlace) => navigate("/delete_place/complete", {state: {formData}}), [navigate]);

    const onClickBack = () => back(deletePlace);
    const onClickSend = () => send(deletePlace);

    return (
        <Container>
            <h2>リクエスト内容確認</h2>
            <p>削除リクエスト内容をご確認ください。</p>

            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" />
            <br />
            <DeletePlaceDetailDisplay contents={deletePlace.contents} />

            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});