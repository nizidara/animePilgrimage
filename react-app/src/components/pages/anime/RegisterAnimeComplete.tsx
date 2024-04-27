import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useNavigate } from "react-router-dom";

export const RegisterAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickTop = useCallback(() => navigate("/"), [navigate]);
    return (
        <Container>
            <h2>アニメ登録完了です．</h2>
            <RegisterAnimeDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOP</Button>
        </Container>
    )
});