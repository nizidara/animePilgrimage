import { memo, FC, useCallback, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerAnimeFormData } from "../../../type/form/anime";
import { useRegisterAnimeContext } from "../../../providers/RegisterAnimeContext";

export const RegisterAnime: FC = memo(() =>{
    const navigate = useNavigate();

    //formData
    const { formData, setFormData } = useRegisterAnimeContext();
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:registerAnimeFormData) => {
        setFormData(data);
    };

    //page transition
    const send = useCallback(() => navigate("/register_anime/confirmation"), [navigate]);

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send();
            }
        }
    }
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            
            <div className="d-flex justify-content-between mt-2">
                <h2>新規アニメ登録</h2>
                <Button variant="outline-primary" className="float-right" onClick={onClickRegisterPlace}>聖地申請はこちら</Button>
            </div>
            
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>
            
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});