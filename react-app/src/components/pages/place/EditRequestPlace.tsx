import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickNext = useCallback(() => navigate("/edit_place/confirmation"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地修正ページです．</h2>
            <RegisterPlaceForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});