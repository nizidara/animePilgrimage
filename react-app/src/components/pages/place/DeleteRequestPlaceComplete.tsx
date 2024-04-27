import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>聖地削除完了ページです．</h2>
            <PlaceSummaryCard />
            <DeletePlaceDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});