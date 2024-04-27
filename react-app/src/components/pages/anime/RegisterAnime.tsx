import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate } from "react-router-dom";

export const RegisterAnime: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickNext = useCallback(() => navigate("/register_anime/confirmation"), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>アニメ登録ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickRegisterPlace}>聖地申請はこちら</Button>
            <RegisterAnimeForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});