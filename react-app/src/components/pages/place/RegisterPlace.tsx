import {memo, FC, useCallback, useState, useRef} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerPlaceFormData } from "../../../type/form/place";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const animeId =location.state?.animeId || "";
    const initialFormData = location.state?.formData || { name: '', anime_id: animeId, region_id: '', comment: '', latitude: 0,  longitude: 0};
    const [formData, setFormData] = useState<registerPlaceFormData>(initialFormData);
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:registerPlaceFormData) => {
        setFormData(data);
    };

    //page transition
    const send = useCallback((formData:registerPlaceFormData) => navigate("/register_place/confirmation", {state: {formData}}), [navigate]);

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(formData);
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <div className="d-flex justify-content-between mt-2">
                <h2>聖地登録</h2>
                <Button variant="outline-primary" className="float-right" onClick={onClickRegisterAnime}>作品登録申請はこちら</Button>
            </div>

            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});