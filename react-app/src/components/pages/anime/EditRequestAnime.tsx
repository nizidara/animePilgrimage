import {memo, FC, useCallback, useState, useEffect, useRef} from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { EditAnimeForm } from "../../organisms/form/EditAnimeForm";
import { editAnimeFormData } from "../../../type/form/anime";

export const EditRequestAnime: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const animeId = location.state.animeId;
    const { anime } = useGetAnimeDetail(animeId);

    const initialFormData = location.state?.formData || { title: '', introduction: '', contents: ''};

    const [formData, setFormData] = useState<editAnimeFormData>(initialFormData);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(anime){
            const title = anime.title;
            const introduction = location.state.formData?.introduction || anime.introduction;
            const contents = location.state.formData?.contents || '';
            setFormData({title, introduction, contents})
        }
        
    },[anime])
    
    const send = useCallback((formData:editAnimeFormData, animeId:number) => navigate("/edit_anime/confirmation", {state: {formData, animeId}}), [navigate]);

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(formData, animeId);
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:editAnimeFormData) => {
        setFormData(data);
    };

    return (
        <Container>
            <h2>作品修正リクエスト</h2>
            <EditAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});