import { ChangeEvent, FC, KeyboardEvent, memo, RefObject } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";
import { usePostRealPhoto } from "../../../hooks/photos/usePostRealPhoto";

type FormProps = {
    placeId: string;
    formData: File[];
    setFormData: React.Dispatch<React.SetStateAction<File[]>>;
    formRef: RefObject<HTMLFormElement>;
    onRealPhotoPosted: () => void;
};

export const AddRealPhotoForm: FC<FormProps> = memo(({placeId, formData, setFormData, formRef, onRealPhotoPosted}) => {

    const {post} = usePostRealPhoto();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && formData.length + e.target.files.length <= 10) {
            const updatedImages = [...formData, ...Array.from(e.target.files)];
            setFormData(updatedImages);
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
        post(placeId, formData, onRealPhotoPosted);
        setFormData([]);
    };

    return (
        <>
            <Form ref={formRef} onKeyDown={handleKeyDown}>
                <Form.Group className="mb-3" controlId="addFormRealImages">
                    <Form.Label>現地画像を追加する（最大10枚）</Form.Label><br />
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