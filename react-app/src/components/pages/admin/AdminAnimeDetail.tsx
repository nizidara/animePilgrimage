import {memo, FC, useCallback, useState, useEffect} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const AdminAnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const query = useQuery();
    const animeId = query.get('anime_id');
    const { anime, loading, error } = useGetAnimeDetail(animeId);
    
    const [formData, setFormData] = useState<registerAnime>({title:'', kana:'', introduction:''});

    useEffect(() => {
        if(anime){
            const {title, kana, introduction} = anime;
            setFormData({title, kana, introduction})
        }
    },[anime])

    const decide = useCallback((animeId: number, formData:registerAnime) => navigate(`/admin/anime?anime_id=${animeId}`, {state: {formData}}), [navigate]);
    
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!anime) {
        return <div>No contact found</div>;
    }

    const formChange = (data:registerAnime) => {
        setFormData(data); // フォームデータを更新
    };

    const onClickDecide = () => decide(anime.anime_id, formData);

    return (
        <Container>
            <h2>アニメ情報編集</h2>
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData}/>
            <BackAndNextButtons backName="戻る" nextName="確定" onClickBack={onClickBack} onClickNext={onClickDecide} />
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
            </div>
        </Container>
    )
});