import {memo, FC, useCallback, useState, useRef} from "react";
import { Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { deletePlaceFormData } from "../../../type/form/place";
import { responsePlaceData } from "../../../type/api/place";

export const DeleteRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const placeId = location.state.placeId;
    const { place, loading, error } = useGetPlaceDetail(placeId);

    //formData
    const initialFormData = location.state?.formData || { contents: ''};
    const [formData, setFormData] = useState<deletePlaceFormData>(initialFormData);
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:deletePlaceFormData) => {
        setFormData(data); // update form data
    };

    //page transition
    const send = useCallback((formData:deletePlaceFormData, place:responsePlaceData) => navigate("/delete_place/confirmation", {state: {formData, place}}), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    if (loading) {
        return <div>loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!place) {
        return <div>place not found</div>;
    }

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(formData, place);
            }
        }
    }

    return (
        <Container>
            <h2>聖地削除リクエスト</h2>
            <PlaceSummaryCard name={place.name} title={place.anime_title} comment={place.comment} anime_id={place.anime_id} place_id={place.place_id} place_icon={place.place_icon}/>
            <br />
            <DeleteRequestPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});