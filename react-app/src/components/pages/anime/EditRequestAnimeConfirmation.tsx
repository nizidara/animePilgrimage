import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useNavigate } from "react-router-dom";

export const EditRequestAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickSend = useCallback(() => navigate("/edit_anime/complete"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>アニメ修正確認ページです．</h2>
            <RegisterAnimeDetailDisplay />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});