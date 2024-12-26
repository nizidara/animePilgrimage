import { memo, FC, useCallback, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AddAnimePhotoForm } from "../../organisms/form/AddAnimePhotoForm";
import { AddRealPhotoForm } from "../../organisms/form/AddRealPhotoForm";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { useGetAnimePhotoList } from "../../../hooks/photos/useGetAnimePhotoList";
import { UpdatePlaceIconForm } from "../../organisms/form/UpdatePlaceIconForm";
import { useGetPlaceIcon } from "../../../hooks/photos/useGetPlaceIcon";
import { PhotoListDisplay } from "../../organisms/display/PhotoListDisplay";
import { PaginationControls } from "../../molecules/PaginationControls";

export const AddPhotoPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const placeId = location.state.placeId;
    const [currentRealPhotoPage, setCurrentRealPhotoPage] = useState<number>(1);
    const realPhotoPageSize = 12;

    const { animePhotoList, fetchAnimePhotos } = useGetAnimePhotoList(placeId);
    const { realPhotoList, totalCount:realPhotoTotalCount, fetchRealPhotos } = useGetRealPhotoList(placeId, currentRealPhotoPage, realPhotoPageSize);
    const { placeIcon, fetchPlaceIcon } = useGetPlaceIcon(placeId);

    const totalRealPhotoPages = Math.ceil(realPhotoTotalCount / realPhotoPageSize);

    const onClickBack = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

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

    //formData
    const [animeImage, setAnimeImage] = useState<File[]>([]);
    const [realImage, setRealImage] = useState<File[]>([]);
    const placeIconRef = useRef<HTMLFormElement>(null);
    const animeImageRef = useRef<HTMLFormElement>(null);
    const realImageRef = useRef<HTMLFormElement>(null);
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                <h2>写真追加フォーム</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                    <Button variant="outline-primary" onClick={() => onClickBack(placeId)}>聖地情報に戻る</Button>
                </Col>
            </Row>
            
            <UpdatePlaceIconForm animePhotoList={animePhotoList} placeIcon={placeIcon} formRef={placeIconRef} onPlaceIconUpdated={fetchPlaceIcon} isAdmin={false} />

            <p>作中写真</p>
            <PhotoListDisplay animePhotoList={animePhotoList} />
            <AddAnimePhotoForm placeId={placeId} formData={animeImage} setFormData={setAnimeImage} formRef={animeImageRef} onAnimePhotoPosted={fetchAnimePhotos} isAdmin={false} />

            <p>現地写真（みんなの投稿）</p>
            <PhotoListDisplay realPhotoList={realPhotoList} />
            <PaginationControls currentPage={currentRealPhotoPage} totalPages={totalRealPhotoPages} onPrevious={handlePhotoPrevious} onSelect={handlePhotoPageSelect} onNext={handlePhotoNext} />
            <AddRealPhotoForm placeId={placeId} formData={realImage} setFormData={setRealImage} formRef={realImageRef} onRealPhotoPosted={fetchRealPhotos} isAdmin={false} />
            
        </Container>
    )
});