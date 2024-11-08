import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { editPlaceFormData } from "../../../type/form/place";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useEditRequestPlace } from "../../../hooks/places/useEditRequestPlace";

export const EditRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const editPlaceFormData = location.state.formData as editPlaceFormData;
    const placeId = location.state.placeId as string;
    const animePhoto = location.state.animePhoto as string[];
    const { anime } = useGetAnimeDetail(editPlaceFormData.anime_id);
    const { region } = useGetRegionDetail(editPlaceFormData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const back = useCallback((formData:editPlaceFormData, placeId:string, animePhoto:string[]) => navigate("/edit_place", {state: {formData, placeId, animePhoto}}), [navigate]);
    const {edit} = useEditRequestPlace();

    const onClickBack = () => back(editPlaceFormData, placeId, animePhoto);
    const onClickSend = () => edit(editPlaceFormData, placeId, animePhoto);

    return (
        <Container>
            <h2>修正リクエスト内容確認</h2>
            <p>聖地情報の修正リクエストの内容をご確認ください。</p>
            
            <EditPlaceDetailDisplay 
                name={editPlaceFormData.name} 
                anime_title={animeTitle}
                region_name={regionName}
                latitude={editPlaceFormData.latitude}
                longitude={editPlaceFormData.longitude}
                comment={editPlaceFormData.comment} 
                contents={editPlaceFormData.contents}
                anime_icon={anime?.file_name}
                file_names={animePhoto}
            />

            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});