import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { useNavigate } from "react-router-dom";

export const PlaceList: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);

    return (
        <Container>
            <h2>聖地一覧ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickAnime}>#anime</Button>
            <DisplayMap />
            <PlaceSummaryCard /><br />
            <PhotoCard />
            <hr />
            <Button variant="secondary" size="lg" onClick={onClickRegisterPlace}>登録</Button><br />
            <PlaceSummaryCard />
        </Container>
    )
});