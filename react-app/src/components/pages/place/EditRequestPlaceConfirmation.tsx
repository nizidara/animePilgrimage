import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";

export const EditRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerPlace = location.state.formData as registerPlace;

    const back = useCallback((formData:registerPlace) => navigate("/edit_place", {state: {formData}}), [navigate]);
    const send = useCallback((formData:registerPlace) => navigate("/edit_place/complete", {state: {formData}}), [navigate]);

    const onClickBack = () => back(registerPlace);
    const onClickSend = () => send(registerPlace);

    return (
        <Container>
            <h2>聖地修正確認ページです．</h2>
            <RegisterPlaceDetailDisplay name={registerPlace.name} animeId={registerPlace.animeId} regionId={registerPlace.regionId} comment={registerPlace.comment} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});