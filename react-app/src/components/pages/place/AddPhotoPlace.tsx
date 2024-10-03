import {memo, FC, useCallback, useRef, useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { useLocation, useNavigate } from "react-router-dom";
import { AddAnimePhotoForm } from "../../organisms/form/AddAnimePhotoForm";
import { AddRealPhotoForm } from "../../organisms/form/AddRealPhotoForm";
import { useGetRealPhotoList } from "../../../hooks/photos/useGetRealPhotoList";
import { useGetAnimePhotoList } from "../../../hooks/photos/useGetAnimePhotoList";


export const AddPhotoPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const placeId = location.state.placeId;
    const { animePhotoList } = useGetAnimePhotoList(placeId);
    const { realPhotoList } = useGetRealPhotoList(placeId);

    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    //formData
    const [animeImage, setAnimeImage] = useState<File[]>([]);
    const [realImage, setRealImage] = useState<File[]>([]);
    const animeImageRef = useRef<HTMLFormElement>(null);
    const realImageRef = useRef<HTMLFormElement>(null);
    
    return (
        <Container>
            <Row className="mt-2 mb-2">
                <Col xs={6}>
                <h2>写真追加フォーム</h2>
                </Col>
                <Col xs={6} className="d-flex justify-content-end align-items-center">
                    <Button variant="outline-primary" onClick={onClickBack}>聖地情報に戻る</Button>
                </Col>
            </Row>
            
            <p>作中写真</p>
            <PhotoCard animePhotoList={animePhotoList} />
            <AddAnimePhotoForm formData={animeImage} setFormData={setAnimeImage} formRef={animeImageRef} />

            <p>現地写真（みんなの投稿）</p>
            <PhotoCard realPhotoList={realPhotoList} />
            <AddRealPhotoForm formData={realImage} setFormData={setRealImage} formRef={realImageRef} />
            
        </Container>
    )
});