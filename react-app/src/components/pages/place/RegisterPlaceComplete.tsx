import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";

export const RegisterPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerPlace = location.state.formData as registerPlace;

    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);

    return (
        <Container>
            <h2>聖地の登録が完了しました</h2>
            <RegisterPlaceDetailDisplay name={registerPlace.name} animeId={registerPlace.animeId} regionId={registerPlace.regionId} comment={registerPlace.comment} />

            <center>
            <Button variant="primary" onClick={onClickRegisterPlace} className="mt-2">続けて聖地を登録</Button><br />
            <Button variant="primary" onClick={onClickAnime} className="mt-2">アニメ情報</Button><br />
            <Button variant="primary" onClick={onClickPlace} className="mt-2">聖地情報</Button>
            </center>
            
        </Container>
    )
});