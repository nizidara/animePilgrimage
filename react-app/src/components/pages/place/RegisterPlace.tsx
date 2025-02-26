import { memo, FC, useCallback, useRef, useEffect, useState } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerPlaceFormData } from "../../../type/form/place";
import { useRegisterPlaceContext } from "../../../providers/RegisterPlaceContext";
import { Helmet } from "react-helmet-async";

export const RegisterPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const { formData, setFormData } = useRegisterPlaceContext();
    const formRef = useRef<HTMLFormElement>(null);

    const [mapError, setMapError] = useState<string | null>(null);

    // initial animeId
    const animeId = location.state?.animeId || 0;
    useEffect(() => {
        if (animeId !== 0 && formData.anime_id === 0) {
            setFormData(prevInputData => ({...prevInputData, anime_id: animeId}));
        }
    },[animeId, formData.anime_id, setFormData])
    

    const formChange = (data:registerPlaceFormData) => {
        setFormData(data);
    };

    const validateCoordinates = (): boolean => {
        if (formData.latitude === 0 && formData.longitude === 0) {
            setMapError("※聖地の場所をMAP上で設定してください");
            return false;
        }
        setMapError(null);
        return true;
    };

    //page transition
    const send = useCallback(() => navigate("/register_place/confirmation"), [navigate]);
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity() && validateCoordinates()) {
                send();
            }
        }
    }

    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地登録",
        "description": `聖地情報を新規登録するページです。`,
        "url": `https://pilgrimage.nizidara.com/register_place`,
        "mainEntityOfPage": {
            "@type": "Place",
            "name": "聖地情報登録",
            "url": "https://pilgrimage.nizidara.com/register_place"
        }
    }

    return (
        <>
            <Helmet>
                <title>{"聖地登録"}</title>
                <meta name="description" content={`聖地登録ページです。 - にじげんたび`} />
                <meta property="og:title" content={`聖地登録 - にじげんたび`} />
                <meta property="og:description" content={`聖地登録ページです。 - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <div className="d-flex justify-content-between mt-2">
                    <h2>聖地登録</h2>
                    <Button variant="outline-primary" className="float-right" onClick={onClickRegisterAnime}>作品登録申請はこちら</Button>
                </div>
                {mapError && <Alert variant="danger">{mapError}</Alert>}
                <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} isAdmin={false} />

                <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
            </Container>
        </>
    )
});