import { memo, FC, useCallback, useState, useEffect, useRef } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerAnimeFormData } from "../../../type/form/anime";
import { useAdminEditAnime } from "../../../hooks/anime/useAdminEditAnime";

export const AdminAnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const animeId = searchParams.get('anime_id');
    const { anime, loading, error, fetchAnimeDetail } = useGetAnimeDetail(animeId);
    const [icon, setIcon] = useState<string | null>(null);

    const { edit, editError} = useAdminEditAnime();
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
    const [formData, setFormData] = useState<registerAnimeFormData>({title:'', kana:'', introduction:''});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(anime){
            const {title, kana, introduction} = anime;
            setFormData({title, kana, introduction})
            anime.file_name && setIcon(anime.file_name);
        }
    },[anime])

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!animeId) {
        return <div>No Anime found</div>;
    }

    const formChange = (data:registerAnimeFormData) => {
        setFormData(data);
    };

    const onClickDecide = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                edit(formData, fetchAnimeDetail, animeId);
            }
        }
    }

    return (
        <Container>
            <h2>アニメ情報編集</h2>
            {editError && <Alert variant="danger">{editError}</Alert>}
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} anime_icon={icon} />
            <BackAndNextButtons backName="戻る" nextName="確定" onClickBack={onClickBack} onClickNext={onClickDecide} />
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
            </div>
        </Container>
    )
});