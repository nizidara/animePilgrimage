import {memo, FC, useCallback} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerPlaceFormData } from "../../../type/form/place";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useRegisterPlace } from "../../../hooks/places/useRegisterPlace";

export const RegisterPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const registerPlaceFormData = location.state.formData as registerPlaceFormData;
    const { anime } = useGetAnimeDetail(registerPlaceFormData.anime_id);
    const { region } = useGetRegionDetail(registerPlaceFormData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const back = useCallback((formData:registerPlaceFormData) => navigate("/register_place", {state: {formData}}), [navigate]);
    const {register} = useRegisterPlace();

    const onClickBack = () => back(registerPlaceFormData);
    const onClickSend = () => register(registerPlaceFormData);
    
    return (
        <Container>
            <h2>登録内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            
            <RegisterPlaceDetailDisplay 
                name={registerPlaceFormData.name} 
                anime_id={registerPlaceFormData.anime_id} 
                region_id={registerPlaceFormData.region_id} 
                comment={registerPlaceFormData.comment} 
                latitude={registerPlaceFormData.latitude}
                longitude={registerPlaceFormData.longitude}
                anime_title={animeTitle}
                region_name={regionName}
                anime_icon={anime?.file_name}
                images={registerPlaceFormData.images}
                icon_index={registerPlaceFormData.icon_index}
            />

            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});