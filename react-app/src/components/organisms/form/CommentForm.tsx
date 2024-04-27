import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const CommentForm: FC = memo(() => {
    const navigate = useNavigate();

    const onClickSend = useCallback(() => navigate("/place"), [navigate]);
    
    return (
        <>
            <hr />
            <p>コメントフォームです</p>
            <Button variant="secondary">写真を添付</Button> <Button variant="primary" size="lg" onClick={onClickSend}>投稿</Button><hr />
        </>
    )
});