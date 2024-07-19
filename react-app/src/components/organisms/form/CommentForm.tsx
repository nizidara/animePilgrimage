import { ChangeEvent, FC, memo, useState } from "react"
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { BsImage } from "react-icons/bs";
import { postCommentFormData } from "../../../type/form/comment";
import { usePostComment } from "../../../hooks/comments/usePostComment";

type commentFormData = {
    placeId: string;
}

export const CommentForm: FC<commentFormData> = memo((props) => {
    const {placeId} = props
    const {post} = usePostComment();

    const [comment, setComment] = useState('');

    const onChangeComment = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

    const formData = {comment} as postCommentFormData

    const onClickSend = () => post(formData, placeId);
    
    return (
        <>
            <hr />
            <Form>
                <Form.Group controlId="commentFormComment">
                    <Form.Label>コメント</Form.Label>
                    <Form.Control as="textarea" name="comment" value={comment} maxLength={140} onChange={onChangeComment} />
                    <Form.Text className="text-muted d-flex justify-content-end align-items-center">
                        {formData.comment.length} / 140
                    </Form.Text>
                </Form.Group>

                <Row className="mb-3">
                    <Col>
                        <Form.Group controlId="commentformPhoto" className="mb-3">
                            <Form.Label>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="media-uploat-tip">画像アップロード</Tooltip>}>
                                    <a className="img"><BsImage /></a>
                                </OverlayTrigger>
                            </Form.Label>
                            <Form.Control type="file" hidden/>
                        </Form.Group>
                    </Col>

                    <Col xs="auto" className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" onClick={onClickSend}>投稿</Button>
                    </Col>
                </Row>
                
            </Form>
        </>
    )
});