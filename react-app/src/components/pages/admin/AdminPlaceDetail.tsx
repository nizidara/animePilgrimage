import { memo, FC, useCallback, useState, useEffect, useRef } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { registerPlaceFormData } from "../../../type/form/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
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
import { PaginationControls } from "../../molecules/PaginationControls";
import { FlagBadge } from "../../atoms/FlagBadge";
import { UpdatePlaceFlagForm } from "../../organisms/form/UpdatePlaceFlagForm";

export const AdminPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const placeId = searchParams.get('place_id');
    const { place, loading:placeLoading, error:placeError, fetchPlaceDetail } = useGetPlaceDetail(placeId);

    const [currentRealPhotoPage, setCurrentRealPhotoPage] = useState<number>(1);
    const realPhotoPageSize = 12;
    
    const { edit, editError } = useAdminEditPlace();
    const { animePhotoList, loading: animePhotoListLoading, error: animePhotoListError,  fetchAnimePhotos } = useGetAnimePhotoList(placeId, undefined, undefined, true);
    const { realPhotoList, loading: realPhotoListLoading, error: realPhotoListError, totalCount:realPhotoTotalCount, fetchRealPhotos } = useGetRealPhotoList(placeId, currentRealPhotoPage, realPhotoPageSize, true);
    const { placeIcon, loading:placeIconLoading, error:placeIconError, fetchPlaceIcon } = useGetPlaceIcon(placeId);

    const totalRealPhotoPages = Math.ceil(realPhotoTotalCount / realPhotoPageSize);

    const [formData, setFormData] = useState<registerPlaceFormData>({name:'', anime_id:0, region_id:0, comment:'', latitude:0, longitude:0, images:[], icon_index:null});
    const formRef = useRef<HTMLFormElement>(null);

    const [animeImage, setAnimeImage] = useState<File[]>([]);
    const [realImage, setRealImage] = useState<File[]>([]);
    const placeFlagRef = useRef<HTMLFormElement>(null);
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
    
    if (placeError) return <Alert variant="danger">{placeError}</Alert>;
    
    if (!place) {
        return <div>No place found</div>;
    }

    //handle real photo
    const handlePhotoPrevious = () => {
        setCurrentRealPhotoPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handlePhotoNext = () => {
        setCurrentRealPhotoPage((prev) => Math.min(prev + 1, totalRealPhotoPages));
    };

    const handlePhotoPageSelect = (page: number) => {
        setCurrentRealPhotoPage(page);
    };
    
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
            {editError && <Alert variant="danger">{editError}</Alert>}
            {placeLoading ? <center><Spinner animation="border" /></center> :
                <>
                    {place && 
                    <>
                        <FlagBadge flag={place.flag} />
                        <UpdatePlaceFlagForm placeId={place.place_id} currentflag={place.flag} formRef={placeFlagRef} onPlaceFlagUpdated={fetchPlaceDetail} />
                    </>}
                    <RegisterPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} isAdmin={true} />
                </>
                
            }
            
            <BackAndNextButtons backName="戻る" nextName="確定" onClickBack={onClickBack} onClickNext={onClickDecide} />
            {placeId && 
                <>
                    <h2>写真編集フォーム</h2>
                    {placeIconError && <Alert variant="danger">{placeIconError}</Alert>}
                    {placeIconLoading ? <center><Spinner animation="border" /></center> :
                        <UpdatePlaceIconForm animePhotoList={animePhotoList} placeIcon={placeIcon} formRef={placeIconRef} onPlaceIconUpdated={fetchPlaceIcon} isAdmin={true} />
                    }

                    <p>作中写真</p>
                    {animePhotoListError && <Alert variant="danger">{animePhotoListError}</Alert>}
                    {animePhotoListLoading ? <center><Spinner animation="border" /></center> :
                        <DeleteAnimePhotoForm photoList={animePhotoList} formRef={animeImageRef} onPhotoPosted={fetchAnimePhotos} />
                    }
                    <AddAnimePhotoForm placeId={placeId} formData={animeImage} setFormData={setAnimeImage} formRef={animeImageRef} onAnimePhotoPosted={fetchAnimePhotos} isAdmin={true} />

                    <p>現地写真（みんなの投稿）</p>
                    {realPhotoListError && <Alert variant="danger">{realPhotoListError}</Alert>}
                    {realPhotoListLoading && <center><Spinner animation="border" /></center>}
                    {realPhotoTotalCount > 0 && 
                        <>
                            <DeleteRealPhotoForm photoList={realPhotoList} formRef={realImageRef} onPhotoPosted={fetchRealPhotos} />
                            <PaginationControls currentPage={currentRealPhotoPage} totalPages={totalRealPhotoPages} onPrevious={handlePhotoPrevious} onSelect={handlePhotoPageSelect} onNext={handlePhotoNext} />
                        </>
                    }
                    <AddRealPhotoForm placeId={placeId} formData={realImage} setFormData={setRealImage} formRef={realImageRef} onRealPhotoPosted={fetchRealPhotos} isAdmin={true} />
                    <div className="d-flex justify-content-center mt-2">
                        <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                    </div>
                </>
            }
            
        </Container>
    )
});