import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlace } from "../../../type/api/place";

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
            <h2>聖地削除確認ページです．</h2>
            <PlaceSummaryCard />
            <DeletePlaceDetailDisplay contents={deletePlace.contents} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});