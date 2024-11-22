import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useEditRequestPlace } from "../../../hooks/places/useEditRequestPlace";
import { useEditPlaceContext } from "../../../providers/EditPlaceContext";

export const EditRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const { formData, animePhoto } = useEditPlaceContext();
    const placeId = location.state.placeId as string;
    const { anime } = useGetAnimeDetail(formData.anime_id);
    const { region } = useGetRegionDetail(formData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const {edit} = useEditRequestPlace();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => edit(formData, placeId, animePhoto);

    return (
        <Container>
            <h2>修正リクエスト内容確認</h2>
            <p>聖地情報の修正リクエストの内容をご確認ください。</p>
            
            <EditPlaceDetailDisplay 
                name={formData.name} 
                anime_title={animeTitle}
                region_name={regionName}
                latitude={formData.latitude}
                longitude={formData.longitude}
                comment={formData.comment} 
                contents={formData.contents}
                anime_icon={anime?.file_name}
                file_names={animePhoto}
            />

            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});