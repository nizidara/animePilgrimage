import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useNavigate } from "react-router-dom";

export const EditRequestAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>アニメ修正完了ページです．</h2>
            <RegisterAnimeDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickAnime}>アニメ情報に戻る</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOP</Button>
        </Container>
    )
});