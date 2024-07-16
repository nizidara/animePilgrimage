import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { registerPlace } from "../../../type/api/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const initialFormData = location.state?.formData || { name: '', animeId: '', regionId: '', comment: '' };
    const [formData, setFormData] = useState<registerPlace>(initialFormData);

    const formChange = (data:registerPlace) => {
        setFormData(data); // フォームデータを更新
    };

    //page transition
    const send = useCallback((formData:registerPlace) => navigate("/register_place/confirmation", {state: {formData}}), [navigate]);

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <div className="d-flex justify-content-between mt-2">
                <h2>聖地登録</h2>
                <Button variant="outline-primary" className="float-right" onClick={onClickRegisterAnime}>作品登録申請はこちら</Button>
            </div>

            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});