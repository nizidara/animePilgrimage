import { memo, FC, useCallback, useEffect, useRef } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { editPlaceFormData } from "../../../type/form/place";
import { EditPlaceForm } from "../../organisms/form/EditPlaceForm";
import { useEditPlaceContext } from "../../../providers/EditPlaceContext";
import { Helmet } from "react-helmet-async";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();
    
    //formData
    const { formData, setFormData, animePhoto, setAnimePhoto } = useEditPlaceContext();
    const formRef = useRef<HTMLFormElement>(null);

    const placeId = location.state.placeId;
    const { place, loading, error } = useGetPlaceDetail(placeId);

    //animeTitle
    const animeTitle = place?.anime_title || "";

    useEffect(() => {
        if(place){
            setFormData((prevFormData) => ({
                name : prevFormData.name || place.name,
                anime_id : place.anime_id,
                region_id : prevFormData.region_id || place.region_id,
                comment : prevFormData.comment || place.comment,
                latitude : prevFormData.latitude || place.latitude,
                longitude : prevFormData.longitude || place.longitude,
                contents : prevFormData.contents || '',
            }))
            const fileNames = place.file_names;
            setAnimePhoto(fileNames)
        }
    },[place, setFormData, setAnimePhoto])

    const formChange = (data:editPlaceFormData) => {
        setFormData(data); // update form data
    };

    //page transition
    const send = useCallback((placeId:string) => navigate("/edit_place/confirmation", {state: {placeId}}), [navigate]);
    
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(placeId);
            }
        }
    }

    const onClickAddPhoto = useCallback(() => navigate("/place/photo", {state: {placeId}}), [navigate, placeId]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地修正リクエスト",
        "description": `登録されている聖地情報の修正リクエストページです。`,
        "url": `https://pilgrimage.nizidara.com/edit_place`,
        "mainEntityOfPage": {
            "@type": "Place",
            "url": "https://pilgrimage.nizidara.com/edit_place",
            "name": "聖地修正リクエスト",
        }
    }
    
    return (
        <>
            <Helmet>
                <title>{"聖地修正リクエスト"}</title>
                <meta name="description" content={`登録されている聖地情報の修正リクエストページです。 - にじげんたび`} />
                <meta property="og:title" content={`聖地修正リクエスト - にじげんたび`} />
                <meta property="og:description" content={`登録されている聖地情報の修正リクエストページです。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
        
            <Container>
                <div className="d-flex justify-content-between mt-2">
                    <h2>聖地修正リクエスト</h2>
                    <Button variant="outline-success" className="float-right" onClick={onClickAddPhoto}>写真追加はこちら</Button>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? <center><Spinner animation="border" /></center> :
                    formData.anime_id !== 0 && <EditPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} animeTitle={animeTitle} animePhoto={animePhoto} formRef={formRef} />
                }
                <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
            </Container>
        </>
    )
});