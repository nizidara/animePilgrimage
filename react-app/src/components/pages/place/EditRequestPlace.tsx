import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { registerPlace } from "../../../type/api/place";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { name: '', animeId: '', regionId: '', comment: '' };

    const send = useCallback((formData:registerPlace) => navigate("/edit_place/confirmation", {state: {formData}}), [navigate]);

    const [formData, setFormData] = useState<registerPlace>(initialFormData);

    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:registerPlace) => {
        setFormData(data); // フォームデータを更新
    };

    return (
        <Container>
            <h2>聖地修正ページです．</h2>
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});