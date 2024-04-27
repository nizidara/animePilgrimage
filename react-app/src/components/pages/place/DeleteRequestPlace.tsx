import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";
import { useNavigate } from "react-router-dom";

export const DeleteRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickNext = useCallback(() => navigate("/delete_place/confirmation"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
    return (
        <Container>
            <h2>聖地削除ページです．</h2>
            <PlaceSummaryCard />
            <DeleteRequestPlaceForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});