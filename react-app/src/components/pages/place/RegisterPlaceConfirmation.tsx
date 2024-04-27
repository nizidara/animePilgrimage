import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const RegisterPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickRegister = useCallback(() => navigate("/register_place/complete"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
    return (
        <Container>
            <h2>聖地登録確認ページです．</h2>
            <RegisterPlaceDetailDisplay />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickRegister}>登録</Button>
        </Container>
    )
});