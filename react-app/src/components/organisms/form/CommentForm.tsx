import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react"
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsImage } from "react-icons/bs";


export const CommentForm: FC = memo(() => {
    const navigate = useNavigate();

    const [comment, setComment] = useState('');

    const onChangeComment = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

    const formData = {comment};

    const onClickSend = useCallback(() => {
        setComment('');
        navigate("/place");
    }, [navigate]);
    
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
                                    <a className="btn"><BsImage /></a>
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