import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const EditRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickSend = useCallback(() => navigate("/edit_place/complete"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地修正確認ページです．</h2>
            <RegisterPlaceDetailDisplay />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </Container>
    )
});