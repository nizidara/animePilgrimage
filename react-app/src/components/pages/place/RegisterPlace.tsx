import { memo, FC, useCallback, useRef, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerPlaceFormData } from "../../../type/form/place";
import { useRegisterPlaceContext } from "../../../providers/RegisterPlaceContext";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const { formData, setFormData } = useRegisterPlaceContext();
    const formRef = useRef<HTMLFormElement>(null);

    // initial animeId
    const animeId = location.state?.animeId || 0;
    useEffect(() => {
        if (animeId !== 0 && formData.anime_id === 0) {
            setFormData(prevInputData => ({...prevInputData, anime_id: animeId}));
        }
    },[animeId, formData.anime_id, setFormData])
    

    const formChange = (data:registerPlaceFormData) => {
        setFormData(data);
    };

    //page transition
    const send = useCallback(() => navigate("/register_place/confirmation"), [navigate]);
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send();
            }
        }
    }

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <div className="d-flex justify-content-between mt-2">
                <h2>聖地登録</h2>
                <Button variant="outline-primary" className="float-right" onClick={onClickRegisterAnime}>作品登録申請はこちら</Button>
            </div>

            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} isAdmin={false} />

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});