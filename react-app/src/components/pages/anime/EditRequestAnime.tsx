import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const EditRequestAnime: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { title: '', kana: '', introduction: '' };

    const [formData, setFormData] = useState<registerAnime>(initialFormData);
    
    const send = useCallback((formData:registerAnime) => navigate("/edit_anime/confirmation", {state: {formData}}), [navigate]);

    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:registerAnime) => {
        setFormData(data); // フォームデータを更新
    };

    return (
        <Container>
            <h2>作品修正リクエスト</h2>
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData}/>

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});