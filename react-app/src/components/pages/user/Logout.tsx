import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Logout: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>ログアウトページです．</h2>
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});