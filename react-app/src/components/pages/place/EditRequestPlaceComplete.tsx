import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";

export const EditRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerPlace = location.state.formData as registerPlace;

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>修正リクエストを送信しました</h2>

            <RegisterPlaceDetailDisplay name={registerPlace.name} animeId={registerPlace.animeId} regionId={registerPlace.regionId} comment={registerPlace.comment} />

            <center>
            <Button variant="primary" onClick={onClickPlace} className="mt-2">聖地情報に戻る</Button><br />
            <Button variant="primary" onClick={onClickTop} className="mt-2">TOPへ</Button>
            </center>
        </Container>
    )
});