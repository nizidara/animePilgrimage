import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate } from "react-router-dom";

export const EditRequestAnime: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickNext = useCallback(() => navigate("/edit_anime/confirmation"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>アニメ修正ページです．</h2>
            <RegisterAnimeForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});