import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const CommentCard: FC = memo(() => {
    const navigate = useNavigate();

    const onClickDeleteComment = useCallback(() => navigate("/delete_comment"), [navigate]);

    return (
        <>
            <b>コメントカードです</b>
            <Button variant="secondary" size="lg" onClick={onClickDeleteComment}>削除</Button>
        </>
    )
});