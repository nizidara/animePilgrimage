import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { registerPlace } from "../../../type/api/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const initialFormData = location.state?.formData || { name: '', animeId: '', regionId: '', comment: '' };
    const [formData, setFormData] = useState<registerPlace>(initialFormData);

    const formChange = (data:registerPlace) => {
        setFormData(data); // フォームデータを更新
    };

    //page transition
    const send = useCallback((formData:registerPlace) => navigate("/edit_place/confirmation", {state: {formData}}), [navigate]);

    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地修正リクエスト</h2>
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});