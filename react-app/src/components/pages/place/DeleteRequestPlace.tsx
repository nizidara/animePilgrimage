import {memo, FC, useCallback, useRef} from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { deletePlaceFormData } from "../../../type/form/place";
import { responsePlaceData } from "../../../type/api/place";
import { useDeletePlaceContext } from "../../../providers/DeletePlaceContext";

export const DeleteRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const { formData, setFormData } = useDeletePlaceContext();
    const formRef = useRef<HTMLFormElement>(null);

    const placeId = location.state.placeId;
    const { place, loading, error } = useGetPlaceDetail(placeId);

    const formChange = (data:deletePlaceFormData) => {
        setFormData(data); // update form data
    };

    //page transition
    const send = useCallback((place:responsePlaceData) => navigate("/delete_place/confirmation", {state: {place}}), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
    if (!place) {
        return <div>place not found</div>;
    }

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send(place);
            }
        }
    }

    return (
        <Container>
            <h2 className="mt-2">聖地削除リクエスト</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
                <>
                    <PlaceSummaryCard name={place.name} title={place.anime_title} comment={place.comment} anime_id={place.anime_id} place_id={place.place_id} place_icon={place.place_icon}/>
                    <DeleteRequestPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>
                </>
            }
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});