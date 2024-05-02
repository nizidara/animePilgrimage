import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";
export const AdminPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { name: '', animeId: '', regionId: '', comment: '' };

    const send = useCallback((formData:registerPlace) => navigate("/admin/place", {state: {formData}}), [navigate]);

    const [formData, setFormData] = useState<registerPlace>(initialFormData);
    
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickDecide = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:registerPlace) => {
        setFormData(data); // フォームデータを更新
    };

    return (
        <Container>
            <h2>Admin聖地詳細ページです．</h2>
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickDecide}>確定</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});