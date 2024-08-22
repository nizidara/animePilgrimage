import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { editAnimeFormData, registerAnimeFormData } from "../../../type/form/anime";
import { useEditRequestAnime } from "../../../hooks/anime/useEditRequestAnime";
import { EditAnimeDetailDisplay } from "../../organisms/display/EditAnimeDetailDisplay";

export const EditRequestAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const {edit} = useEditRequestAnime();

    const editAnimeFormData = location.state.formData as editAnimeFormData;
    const animeId = location.state.animeId;
    const currentIcon = location.state?.currentIcon;

    const back = useCallback((formData:editAnimeFormData, animeId:number) => navigate("/edit_anime", {state: {formData, animeId}}), [navigate]);

    const onClickBack = () => back(editAnimeFormData, animeId);
    const onClickSend = () => edit(editAnimeFormData, animeId);

    return (
        <Container>
            <h2>リクエスト内容確認</h2>
            <EditAnimeDetailDisplay 
                title={editAnimeFormData.title} 
                introduction={editAnimeFormData.introduction} 
                contents={editAnimeFormData.contents} 
                current_icon={currentIcon}
                new_icon={editAnimeFormData.icon}
            />
            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});