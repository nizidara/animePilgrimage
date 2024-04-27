import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";

export const EditRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>聖地修正完了ページです．</h2>
            <RegisterPlaceDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});