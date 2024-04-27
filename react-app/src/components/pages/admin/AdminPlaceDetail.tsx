import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useNavigate } from "react-router-dom";
export const AdminPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickDecide = useCallback(() => navigate("/admin/place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>Admin聖地詳細ページです．</h2>
            <RegisterPlaceForm />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickDecide}>確定</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});