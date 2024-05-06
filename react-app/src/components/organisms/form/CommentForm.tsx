import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
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
                <Form.Group className="mb-3" controlId="commentFormComment">
                    <Form.Label>コメント</Form.Label>
                    <Form.Control as="textarea" name="comment" value={comment} maxLength={140} onChange={onChangeComment} />
                    <Form.Text className="text-muted">{formData.comment.length} / 140 </Form.Text>
                </Form.Group>

                <Row>
                    <Col sm={10}>
                        <Form.Group controlId="commentformPhoto" className="mb-3">
                            <Form.Label><BsImage /></Form.Label>
                            <Form.Control type="file" hidden/>
                        </Form.Group>
                    </Col>

                    <Col sm={2}>
                        <Button variant="primary" onClick={onClickSend}>投稿</Button>
                    </Col>
                </Row>
                
            </Form>
        </>
    )
});