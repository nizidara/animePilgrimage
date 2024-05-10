import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const EditRequestAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerAnime = location.state.formData as registerAnime;

    const back = useCallback((formData:registerAnime) => navigate("/edit_anime", {state: {formData}}), [navigate]);
    const send = useCallback((formData:registerAnime) => navigate("/edit_anime/complete", {state: {formData}}), [navigate]);

    const onClickBack = () => back(registerAnime);
    const onClickSend = () => send(registerAnime);

    return (
        <Container>
            <h2>リクエスト内容確認</h2>
            <RegisterAnimeDetailDisplay title={registerAnime.title} kana={registerAnime.kana} introduction={registerAnime.introduction} />

            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});