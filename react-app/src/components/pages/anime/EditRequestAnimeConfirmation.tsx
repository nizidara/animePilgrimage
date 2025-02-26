import { memo, FC, useCallback, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useEditRequestAnime } from "../../../hooks/anime/useEditRequestAnime";
import { EditAnimeDetailDisplay } from "../../organisms/display/EditAnimeDetailDisplay";
import { useEditAnimeContext } from "../../../providers/EditAnimeContext";
import { Helmet } from "react-helmet-async";

export const EditRequestAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const { formData } = useEditAnimeContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const animeId = location.state.animeId;
    const currentIcon = location.state?.currentIcon;

    const { edit, editError } = useEditRequestAnime();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => {
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        edit(formData, animeId, () => setIsSubmitting(false));
    }

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "アニメ修正リクエスト内容確認ページ",
        "description": `アニメ情報の修正リクエスト内容を確認するページです。`,
        "url": `https://pilgrimage.nizidara.com/edit_anime/confirmation`,
        "mainEntityOfPage": {
            "@type": "ConfirmAction",
            "name": "アニメ修正リクエスト内容確認",
            "actionStatus": "https://schema.org/ActiveActionStatus"
        }
    }

    return (
        <>
            <Helmet>
                <title>{"アニメ修正リクエスト 確認"}</title>
                <meta name="description" content={`アニメ修正リクエストの内容確認ページです。 - にじげんたび`} />
                <meta property="og:title" content={`アニメ修正リクエスト 確認 - にじげんたび`} />
                <meta property="og:description" content={`アニメ修正リクエストの内容確認ページです。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">リクエスト内容確認</h2>
                {editError && <Alert variant="danger">{editError}</Alert>}
                <EditAnimeDetailDisplay 
                    title={formData.title} 
                    introduction={formData.introduction} 
                    contents={formData.contents} 
                    current_icon={currentIcon}
                    new_icon={formData.icon}
                />
                <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
            </Container>
        </>
    )
});