import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";

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
            <h2>アニメ修正確認ページです．</h2>
            <RegisterAnimeDetailDisplay title={registerAnime.title} kana={registerAnime.kana} introduction={registerAnime.introduction} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});