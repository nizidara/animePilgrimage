import {memo, FC, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const RegisterAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //registration contents
    const registerAnime = location.state.formData as registerAnime;
    
    const back = useCallback((formData:registerAnime) => navigate("/register_anime", {state: {formData}}), [navigate]);
    const send = useCallback((formData:registerAnime) => navigate("/register_anime/complete", {state: {formData}}), [navigate]);

    const onClickBack = () => back(registerAnime);
    const onClickSend = () => send(registerAnime);

    return (
        <Container>
            <h2>新規アニメ登録申請 内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            <RegisterAnimeDetailDisplay title={registerAnime.title} kana={registerAnime.kana} introduction={registerAnime.introduction} />

            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});