import {memo, FC, useCallback, useState, useEffect} from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { editPlaceFormData } from "../../../type/form/place";
import { EditPlaceForm } from "../../organisms/form/EditPlaceForm";

export const EditRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const placeId = location.state.placeId;
    const { place, loading, error } = useGetPlaceDetail(placeId);

    //formData
    const initialFormData = location.state?.formData || {name:'', anime_id:0, region_id:0, comment:'', latitude:0, longitude:0, contents:''};
    const [formData, setFormData] = useState<editPlaceFormData>(initialFormData);

    //animeTitle
    const animeTitle = place?.anime_title || "";

    useEffect(() => {
        if(place){
            const {name, comment, latitude, longitude, anime_id, region_id} = place;
            const contents = "";
            setFormData({name, anime_id, region_id, comment, latitude, longitude, contents})
        }
    },[place])

    const formChange = (data:editPlaceFormData) => {
        setFormData(data); // フォームデータを更新
    };

    //page transition
    const send = useCallback((formData:editPlaceFormData, placeId:string) => navigate("/edit_place/confirmation", {state: {formData, placeId}}), [navigate]);

    const onClickNext = () => send(formData, placeId);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地修正リクエスト</h2>
            <EditPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} animeTitle={animeTitle} />
            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});