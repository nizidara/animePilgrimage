import { memo, FC, useCallback, useEffect, useRef } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { EditAnimeForm } from "../../organisms/form/EditAnimeForm";
import { editAnimeFormData } from "../../../type/form/anime";
import { useEditAnimeContext } from "../../../providers/EditAnimeContext";

export const EditRequestAnime: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const { formData, setFormData } = useEditAnimeContext();
    const formRef = useRef<HTMLFormElement>(null);

    const animeId = location.state.animeId;
    const { anime, loading, error } = useGetAnimeDetail(animeId);

    useEffect(() => {
        if(anime){
            setFormData((prevFormData) =>({
                title: anime.title,
                introduction: prevFormData.introduction !== null ? prevFormData.introduction : anime.introduction,
                contents: prevFormData.contents || '',
                icon: prevFormData.icon,
            }))
        }
    },[anime, setFormData])
    
    const send = useCallback((animeId:number, currentIcon?:string | null) => navigate("/edit_anime/confirmation", {state: {animeId, currentIcon}}), [navigate]);
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(animeId, anime?.file_name);
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:editAnimeFormData) => {
        setFormData(data);
    };

    return (
        <Container>
            <h2 className="mt-2">作品修正リクエスト</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> : 
                <EditAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} anime_icon={anime?.file_name}/>
            }
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});