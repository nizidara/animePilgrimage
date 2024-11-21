import { ChangeEvent, FC, KeyboardEvent, memo, RefObject, useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";
import { usePostAnimePhoto } from "../../../hooks/photos/usePostAnimePhoto";

type FormProps = {
    placeId: string;
    formData: File[];
    setFormData: React.Dispatch<React.SetStateAction<File[]>>;
    formRef: RefObject<HTMLFormElement>;
    onAnimePhotoPosted: () => void;
    isAdmin: boolean;
};

export const AddAnimePhotoForm: FC<FormProps> = memo(({placeId, formData, setFormData, formRef, onAnimePhotoPosted, isAdmin}) => {
    const {post} = usePostAnimePhoto(isAdmin);

    const [imageError, setImageError] = useState<string>("");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && formData.length + e.target.files.length <= 10) {
            const newFiles = Array.from(e.target.files);
            const invalidFiles = newFiles.filter(file => !file.type.startsWith("image/"));
            if (invalidFiles.length > 0) {
                setImageError("※画像ファイルのみアップロード可能です");
                return;
            }

            setImageError("");

            const updatedImages = [...formData, ...Array.from(e.target.files)];
            setFormData(updatedImages);
        } else {
            setImageError("画像は最大4枚までアップロード可能です。");
            return;
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...formData];
        updatedImages.splice(index, 1);
        setFormData(updatedImages);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const onClickSend = () => {
        post(placeId, formData, onAnimePhotoPosted);
        setFormData([]);
    };
    
    return (
        <>
            <Form ref={formRef} onKeyDown={handleKeyDown}>
                <Form.Group className="mb-3" controlId="addFormAnimeImages">
                    <Form.Label className="me-2">アニメ画像を追加する（最大10枚）</Form.Label>
                    {imageError && <span className="text-danger">{imageError}</span>}<br />
                    <Form.Label>
                        <FileUploadIcon />
                    </Form.Label>
                    <Form.Control type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
                </Form.Group>
                <Row className="mb-3">
                    <Col>
                        <div className="d-flex flex-wrap">
                            {formData.map((image, index) => (
                                <div key={index} className="position-relative m-1">
                                    <Image src={URL.createObjectURL(image)} thumbnail width={200} height={200} />
                                    <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={() => handleRemoveImage(index)}>×</Button>
                                </div>
                            ))}
                        </div>
                    </Col>
            
                    <Col xs="auto" className="d-flex justify-content-end align-items-end">
                            <Button variant="primary" disabled={!formData[0]} onClick={onClickSend}>追加</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
});