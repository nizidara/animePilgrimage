import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const LoginForm: FC = memo(() => {
    const navigate = useNavigate();

    const onClickLogin = useCallback(() => navigate("/"), [navigate]);

    return (
        <>
            <p>ログインフォームです</p>
            <Button variant="primary" size="lg" onClick={onClickLogin}>ログイン</Button>
        </>
    )
});