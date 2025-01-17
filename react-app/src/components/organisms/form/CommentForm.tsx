import { ChangeEvent, FC, memo, useState } from "react"
import { Alert, Button, Col, Form, Image, Row } from "react-bootstrap";
import { usePostComment } from "../../../hooks/comments/usePostComment";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";

type commentFormData = {
    placeId: string;
    onCommentPosted: () => void;
}

export const CommentForm: FC<commentFormData> = memo((props) => {
    const {placeId, onCommentPosted} = props
    const {post, postError} = usePostComment();

    const [comment, setComment] = useState('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [imageError, setImageError] = useState<string>("");

    const onChangeComment = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);
    
    // プレビュー画像のURLを生成する関数
    const generatePreviewUrls = (files: File[]) => {
        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls([...previewUrls, ...urls]);
    };

    // ファイル選択時の処理
    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && selectedImages.length + e.target.files.length <= 4) {
            const newFiles = Array.from(e.target.files);
            const invalidFiles = newFiles.filter(file => !file.type.startsWith("image/"));
            if (invalidFiles.length > 0) {
                setImageError("※画像ファイルのみアップロード可能です");
                return;
            }

            setImageError("");
            setSelectedImages([...selectedImages, ...newFiles]);

            // 新しく選択された画像のプレビューURLを生成
            generatePreviewUrls(newFiles);
        } else {
            setImageError("画像は最大4枚までアップロード可能です。");
        }
    };

    // 画像削除時の処理
    const removeImage = (index: number) => {
        const updatedImages = [...selectedImages];
        const updatedUrls = [...previewUrls];

        // Blob URLを解放
        URL.revokeObjectURL(previewUrls[index]);

        updatedImages.splice(index, 1);
        updatedUrls.splice(index, 1);

        setSelectedImages(updatedImages);
        setPreviewUrls(updatedUrls);
    };

    const onClickSend = () => {
        post(comment, placeId, selectedImages, onCommentPosted);
        setComment('');
        setSelectedImages([]);
        setPreviewUrls([]);
      };
    
    return (
        <>
            <hr />
            <Form>
                <Form.Group controlId="commentFormComment">
                    <Form.Label>コメント</Form.Label>
                    {postError && <Alert variant="danger">{postError}</Alert>}
                    <Form.Control as="textarea" name="comment" value={comment} maxLength={300} onChange={onChangeComment} rows={3}/>
                    <Form.Text className={`d-flex justify-content-end align-items-center ${comment.length > 140 ? "text-danger" : "text-muted"}`}>
                        {comment.length} / 140
                    </Form.Text>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="commentformPhoto" className="mb-3">
                            {imageError && <div><span className="text-danger">{imageError}</span><br /></div>}
                            <Form.Label>
                                <FileUploadIcon />
                            </Form.Label>
                            <Form.Control type="file" accept="image/*" multiple hidden onChange={onImageChange} />
                        </Form.Group>
                        <div className="d-flex flex-wrap">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="position-relative m-1">
                                    <Image src={url} thumbnail width={200} height={200} />
                                    <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={() => removeImage(index)}>×</Button>
                                </div>
                            ))}
                        </div>
                    </Col>

                    <Col xs="auto" className="d-flex justify-content-end align-items-end">
                        <Button variant="primary" disabled={(!comment && selectedImages.length === 0) || comment.length > 140} onClick={onClickSend} >投稿</Button>
                    </Col>
                </Row>
                
            </Form>
        </>
    )
});