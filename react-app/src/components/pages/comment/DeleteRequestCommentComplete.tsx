import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";
import { useNavigate } from "react-router-dom";

export const DeleteRequestCommentComplete: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);

    return (
        <Container>
            <h2>コメント通報完了ページです．</h2>
            <DeleteCommentDetailDisplay />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button>
        </Container>
    )
});