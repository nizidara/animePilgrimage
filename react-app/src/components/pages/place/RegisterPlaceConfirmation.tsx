import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useRegisterPlace } from "../../../hooks/places/useRegisterPlace";
import { useRegisterPlaceContext } from "../../../providers/RegisterPlaceContext";

export const RegisterPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const { formData } = useRegisterPlaceContext();
    const { anime } = useGetAnimeDetail(formData.anime_id);
    const { region } = useGetRegionDetail(formData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const { register } = useRegisterPlace();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => register(formData);
    
    return (
        <Container>
            <h2>登録内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            
            <RegisterPlaceDetailDisplay 
                name={formData.name} 
                anime_id={formData.anime_id} 
                region_id={formData.region_id} 
                comment={formData.comment} 
                latitude={formData.latitude}
                longitude={formData.longitude}
                anime_title={animeTitle}
                region_name={regionName}
                anime_icon={anime?.file_name}
                images={formData.images}
                icon_index={formData.icon_index}
            />

            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});