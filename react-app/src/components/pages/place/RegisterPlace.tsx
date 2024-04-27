import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useNavigate } from "react-router-dom";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickNext = useCallback(() => navigate("/register_place/confirmation"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地登録ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickRegisterAnime}>作品申請はこちら</Button>
            <RegisterPlaceForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});