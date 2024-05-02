import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { name: '', animeId: '', regionId: '', comment: '' };

    const send = useCallback((formData:registerPlace) => navigate("/register_place/confirmation", {state: {formData}}), [navigate]);

    const [formData, setFormData] = useState<registerPlace>(initialFormData);

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:registerPlace) => {
        setFormData(data); // フォームデータを更新
    };

    return (
        <Container>
            <h2>聖地登録ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickRegisterAnime}>作品申請はこちら</Button>
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});