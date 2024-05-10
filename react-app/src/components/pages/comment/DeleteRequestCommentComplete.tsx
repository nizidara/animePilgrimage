import {memo, FC, useCallback} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteComment } from "../../../type/api/comment";

export const DeleteRequestCommentComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const deleteComment = location.state.formData as deleteComment;

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);

    return (
        <Container>
            <h2>コメント削除・通報申請が完了しました</h2>
            <DeleteCommentDetailDisplay contents={deleteComment.contents} />
            <Row className="justify-content-md-center mt-2">
                <Col md="auto">
                    <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button>
                </Col>
            </Row>
        </Container>
    )
});