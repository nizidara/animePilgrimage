import { memo, FC, useCallback, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useEditRequestPlace } from "../../../hooks/places/useEditRequestPlace";
import { useEditPlaceContext } from "../../../providers/EditPlaceContext";
import { Helmet } from "react-helmet-async";

export const EditRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const { formData, animePhoto } = useEditPlaceContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const placeId = location.state.placeId as string;
    const { anime, loading:animeLoading, error:animeError } = useGetAnimeDetail(formData.anime_id);
    const { region, loading:regionLoading, error:regionError } = useGetRegionDetail(formData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const { edit, editError } = useEditRequestPlace();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => {
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        edit(formData, placeId, animePhoto, () => setIsSubmitting(false));
    }

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地修正リクエスト内容確認ページ",
        "description": `聖地修正リクエストの内容を確認するページです。`,
        "url": `https://pilgrimage.nizidara.com/edit_place/confirmation`,
        "mainEntityOfPage": {
            "@type": "ConfirmAction",
            "name": "聖地修正リクエスト内容確認",
            "actionStatus": "https://schema.org/ActiveActionStatus"
        }
    }

    return (
        <>
            <Helmet>
                <title>{"聖地修正リクエスト 確認"}</title>
                <meta name="description" content={`登録されている聖地情報の修正リクエストの内容確認ページです。 - にじげんたび`} />
                <meta property="og:title" content={`聖地修正リクエスト 確認 - にじげんたび`} />
                <meta property="og:description" content={`登録されている聖地情報の修正リクエストの内容確認ページです。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            
            <Container>
                <h2 className="mt-2">修正リクエスト内容確認</h2>
                {editError && <Alert variant="danger">{editError}</Alert>}
                <p>聖地情報の修正リクエストの内容をご確認ください。</p>
                {animeError && <Alert variant="danger">{animeError}</Alert>}
                {regionError && <Alert variant="danger">{regionError}</Alert>}
                {animeLoading || regionLoading ? <center><Spinner animation="border" /></center>:
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
                }
                <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
            </Container>
        </>
    )
});