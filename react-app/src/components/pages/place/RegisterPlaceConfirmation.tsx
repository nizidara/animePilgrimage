import { memo, FC, useCallback, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { useGetRegionDetail } from "../../../hooks/regions/useGetRegionDetail";
import { useRegisterPlace } from "../../../hooks/places/useRegisterPlace";
import { useRegisterPlaceContext } from "../../../providers/RegisterPlaceContext";
import { Helmet } from "react-helmet-async";

export const RegisterPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const { formData } = useRegisterPlaceContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { anime, loading:animeLoading, error:animeError } = useGetAnimeDetail(formData.anime_id);
    const { region, loading:regionLoading, error:regionError } = useGetRegionDetail(formData.region_id);
    const animeTitle = anime ? anime.title : "";
    const regionName = region ? region.region_name : "";

    const { register, registerError } = useRegisterPlace();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => {
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        register(formData, () => setIsSubmitting(false));
    }

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地登録内容確認ページ",
        "description": `聖地情報を新規登録の内容を確認するページです。`,
        "url": `https://pilgrimage.nizidara.com/register_place/confirmation`,
        "mainEntityOfPage": {
            "@type": "ConfirmAction",
            "name": "聖地情報登録確認",
            "actionStatus": "https://schema.org/ActiveActionStatus"
        }
    }
    
    return (
        <>
            <Helmet>
                <title>{"聖地登録 確認"}</title>
                <meta name="description" content={`聖地登録の内容確認ページです。 - にじげんたび`} />
                <meta property="og:title" content={`聖地登録 確認 - にじげんたび`} />
                <meta property="og:description" content={`聖地登録の内容確認ページです。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            
            <Container>
                <h2 className="mt-2">登録内容確認</h2>
                {registerError && <Alert variant="danger">{registerError}</Alert>}
                <p>登録する内容をご確認ください。</p>
                {animeError && <Alert variant="danger">{animeError}</Alert>}
                {regionError && <Alert variant="danger">{regionError}</Alert>}
                {animeLoading || regionLoading ? <center><Spinner animation="border" /></center>:
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
                } 
                <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
            </Container>
        </>
    )
});