import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const RegisterPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);

    return (
        <Container>
            <h2>聖地登録完了ページです．</h2>
            <RegisterPlaceDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickRegisterPlace}>続けて聖地を登録</Button><br />
            <Button variant="primary" size="lg" onClick={onClickAnime}>アニメ情報</Button><br />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報</Button>
        </Container>
    )
});