import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

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
            <h2>修正リクエスト内容確認</h2>
            <p>聖地情報の修正リクエストの内容をご確認ください。</p>
            
            <RegisterPlaceDetailDisplay name={registerPlace.name} animeId={registerPlace.animeId} regionId={registerPlace.regionId} comment={registerPlace.comment} />

            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});