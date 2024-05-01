import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
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
            <h2>コメント通報完了ページです．</h2>
            <DeleteCommentDetailDisplay contents={deleteComment.contents} />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button>
        </Container>
    )
});