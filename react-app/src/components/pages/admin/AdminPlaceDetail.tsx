import { memo, FC, useCallback, useState, useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useNavigate } from "react-router-dom";
import { registerPlaceFormData } from "../../../type/form/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useQuery } from "../../../hooks/utilities/useQuery";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useAdminEditPlace } from "../../../hooks/places/useAdminEditPlace";
import { useGetAnimePhotoList } from "../../../hooks/photos/useGetAnimePhotoList";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { useGetPlaceIcon } from "../../../hooks/photos/useGetPlaceIcon";
import { UpdatePlaceIconForm } from "../../organisms/form/UpdatePlaceIconForm";
import { AddAnimePhotoForm } from "../../organisms/form/AddAnimePhotoForm";
import { AddRealPhotoForm } from "../../organisms/form/AddRealPhotoForm";
import { DeleteAnimePhotoForm } from "../../organisms/form/DeleteAnimePhotoForm";
import { DeleteRealPhotoForm } from "../../organisms/form/DeleteRealPhotoForm";

export const AdminPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const query = useQuery();
    const placeId = query.get('place_id');
    const { place, loading, error } = useGetPlaceDetail(placeId);
    
    const {edit} = useAdminEditPlace();
    const { animePhotoList, fetchAnimePhotos } = useGetAnimePhotoList(placeId);
    const { realPhotoList, fetchRealPhotos } = useGetRealPhotoList(placeId);
    const { placeIcon, fetchPlaceIcon } = useGetPlaceIcon(placeId);

    const [formData, setFormData] = useState<registerPlaceFormData>({name:'', anime_id:0, region_id:0, comment:'', latitude:0, longitude:0, images:[], icon_index:null});
    const formRef = useRef<HTMLFormElement>(null);

    const [animeImage, setAnimeImage] = useState<File[]>([]);
    const [realImage, setRealImage] = useState<File[]>([]);
    const placeIconRef = useRef<HTMLFormElement>(null);
    const animeImageRef = useRef<HTMLFormElement>(null);
    const realImageRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if(place){
            const {name, comment, latitude, longitude, anime_id, region_id} = place;
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
        setFormData(data); //update form data
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
            <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} isAdmin={true} />
            <BackAndNextButtons backName="戻る" nextName="確定" onClickBack={onClickBack} onClickNext={onClickDecide} />
            {placeId && <>
                <h2>写真編集フォーム</h2>
            
                <UpdatePlaceIconForm animePhotoList={animePhotoList} placeIcon={placeIcon} formRef={placeIconRef} onPlaceIconUpdated={fetchPlaceIcon} isAdmin={true} />

                <p>作中写真</p>
                <DeleteAnimePhotoForm photoList={animePhotoList} formRef={animeImageRef} onPhotoPosted={fetchAnimePhotos} />
                <AddAnimePhotoForm placeId={placeId} formData={animeImage} setFormData={setAnimeImage} formRef={animeImageRef} onAnimePhotoPosted={fetchAnimePhotos} isAdmin={true} />

                <p>現地写真（みんなの投稿）</p>
                <DeleteRealPhotoForm photoList={realPhotoList} formRef={realImageRef} onPhotoPosted={fetchRealPhotos} />
                <AddRealPhotoForm placeId={placeId} formData={realImage} setFormData={setRealImage} formRef={realImageRef} onRealPhotoPosted={fetchRealPhotos} isAdmin={true} />
                <div className="d-flex justify-content-center mt-2">
                    <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                </div>
            </>
            }
            
        </Container>
    )
});