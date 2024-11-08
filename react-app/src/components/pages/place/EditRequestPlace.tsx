import { memo, FC, useCallback, useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { editPlaceFormData } from "../../../type/form/place";
import { EditPlaceForm } from "../../organisms/form/EditPlaceForm";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const placeId = location.state.placeId;
    const { place } = useGetPlaceDetail(placeId);

    //formData
    const initialFormData = location.state?.formData || {name:'', anime_id:0, region_id:0, comment:'', latitude:0, longitude:0, contents:''};
    const [formData, setFormData] = useState<editPlaceFormData>(initialFormData);
    const [animePhoto, setAnimePhoto] = useState<string[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    //animeTitle
    const animeTitle = place?.anime_title || "";

    useEffect(() => {
        if(place){
            const name = location.state.formData?.name || place.name;
            const anime_id = place.anime_id;
            const region_id = location.state.formData?.region_id || place.region_id;
            const latitude = location.state.formData?.latitude || place.latitude;
            const longitude = location.state.formData?.longitude || place.longitude;
            const comment = location.state.formData?.comment || place.comment;
            const contents = location.state.formData?.contents || '';
            const fileNames = location.state.animePhoto || place.file_names;
            setFormData({name, anime_id, region_id, comment, latitude, longitude, contents})
            setAnimePhoto(fileNames)
        }
    },[place])

    const formChange = (data:editPlaceFormData) => {
        setFormData(data); // update form data
    };

    //page transition
    const send = useCallback((formData:editPlaceFormData, placeId:string, animePhoto:string[]) => navigate("/edit_place/confirmation", {state: {formData, placeId, animePhoto}}), [navigate]);
    
    const onClickAddPhoto = useCallback(() => navigate("/place/photo", {state: {placeId}}), [navigate, placeId]);
    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(formData, placeId, animePhoto);
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
    return (
        <Container>
            
            <div className="d-flex justify-content-between mt-2">
                <h2>聖地修正リクエスト</h2>
                <Button variant="outline-success" className="float-right" onClick={onClickAddPhoto}>写真追加はこちら</Button>
            </div>
            {formData.anime_id !== 0 && <EditPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} animeTitle={animeTitle} animePhoto={animePhoto} formRef={formRef} />}
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});