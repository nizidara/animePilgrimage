import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";

export const AnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_anime"), [navigate]);
    const onClickMap = useCallback(() => navigate("/place/list"), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place"), [navigate]);

    return (
        <Container>
            <h2>アニメ詳細ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickEdit}>修正</Button>
            <AnimeIntroductionDisplay />
            <hr />
            <Button variant="primary" size="lg" onClick={onClickMap}>MAPを見る</Button> <Button variant="secondary" size="lg" onClick={onClickRegister}>登録</Button>
            <hr />
            <PlaceSummaryCard />
        </Container>
    )
});