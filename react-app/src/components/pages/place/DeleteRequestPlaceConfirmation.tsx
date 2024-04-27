import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const DeleteRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickSend = useCallback(() => navigate("/delete_place/complete"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地削除確認ページです．</h2>
            <PlaceSummaryCard />
            <DeletePlaceDetailDisplay />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});