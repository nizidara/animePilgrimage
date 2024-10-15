import {memo, FC, useCallback, useState, useEffect, useRef} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useNavigate } from "react-router-dom";
import { registerPlaceFormData } from "../../../type/form/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useAdminEditPlace } from "../../../hooks/places/useAdminEditPlace";
export const AdminPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const query = useQuery();
    const placeId = query.get('place_id');
    const { place, loading, error } = useGetPlaceDetail(placeId);
    
    const {edit} = useAdminEditPlace();

    //要修正？(image対応)
    const [formData, setFormData] = useState<registerPlaceFormData>({name:'', anime_id:0, region_id:0, comment:'', latitude:0, longitude:0, images:[], icon_index:null});
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(place){
            //要修正？(image対応)
            const {name, comment, latitude, longitude, anime_id, region_id, file_names} = place;
            setFormData({name, anime_id, region_id, comment, latitude, longitude, images:[], icon_index:null})
        }
    },[place])

    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    if (loading) {
        return <div>loading...</div>;
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    if (!place) {
        return <div>No place found</div>;
    }
    
    const formChange = (data:registerPlaceFormData) => {
        setFormData(data); // フォームデータを更新
    };

    const onClickDecide = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                edit(formData, place.place_id, place.created_user_id);
            }
        }
    }

    return (
        <Container>
            <h2>聖地情報編集</h2>
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} />
            <BackAndNextButtons backName="戻る" nextName="確定" onClickBack={onClickBack} onClickNext={onClickDecide} />
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
            </div>
        </Container>
    )
});