import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";

export const RegisterAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerAnime = location.state.formData as registerAnime;
    
    const onClickTop = useCallback(() => navigate("/"), [navigate]);
    return (
        <Container>
            <h2>アニメ登録完了です．</h2>
            <RegisterAnimeDetailDisplay title={registerAnime.title} kana={registerAnime.kana} introduction={registerAnime.introduction} />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOP</Button>
        </Container>
    )
});