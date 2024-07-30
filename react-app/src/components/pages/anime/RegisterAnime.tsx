import { memo, FC, useCallback, useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerAnimeFormData } from "../../../type/form/anime";

export const RegisterAnime: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const initialFormData = location.state?.formData || { title: '', kana: '', introduction: '' };
    const [formData, setFormData] = useState<registerAnimeFormData>(initialFormData);
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:registerAnimeFormData) => {
        setFormData(data);
    };

    //page transition
    const send = useCallback((formData:registerAnimeFormData) => navigate("/register_anime/confirmation", {state: {formData}}), [navigate]);

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(formData);
            }
        }
    }
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            
            <div className="d-flex justify-content-between mt-2">
                <h2>新規アニメ登録申請</h2>
                <Button variant="outline-primary" className="float-right" onClick={onClickRegisterPlace}>聖地申請はこちら</Button>
            </div>
            
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>
            
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});