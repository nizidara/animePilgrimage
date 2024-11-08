import { ChangeEvent, FC, memo, useState } from "react"
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { usePostComment } from "../../../hooks/comments/usePostComment";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";

type commentFormData = {
    placeId: string;
    onCommentPosted: () => void;
}

export const CommentForm: FC<commentFormData> = memo((props) => {
    const {placeId, onCommentPosted} = props
    const {post} = usePostComment();

    const [comment, setComment] = useState('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const onChangeComment = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && selectedImages.length + e.target.files.length <= 4) {
            setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const onClickSend = () => {
        post(comment, placeId, selectedImages, onCommentPosted);
        setComment('');
        setSelectedImages([]);
      };
    
    return (
        <>
            <hr />
            <Form>
                <Form.Group controlId="commentFormComment">
                    <Form.Label>コメント</Form.Label>
                    <Form.Control as="textarea" name="comment" value={comment} maxLength={140} onChange={onChangeComment} />
                    <Form.Text className="text-muted d-flex justify-content-end align-items-center">
                        {comment.length} / 140
                    </Form.Text>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="commentformPhoto" className="mb-3">
                            <Form.Label>
                                <FileUploadIcon />
                            </Form.Label>
                            <Form.Control type="file" accept="image/*" multiple hidden onChange={onImageChange} />
                        </Form.Group>
                        <div className="d-flex flex-wrap">
                            {selectedImages.map((image, index) => (
                                <div key={index} className="position-relative m-1">
                                    <Image src={URL.createObjectURL(image)} thumbnail width={200} height={200} />
                                    <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={() => removeImage(index)}>×</Button>
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col xs="auto" className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" disabled={!comment && selectedImages.length === 0} onClick={onClickSend} >投稿</Button>
                    </Col>
                </Row>
                
            </Form>
        </>
    )
});