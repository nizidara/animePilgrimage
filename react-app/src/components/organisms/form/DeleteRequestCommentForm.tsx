import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const DeleteRequestCommentForm: FC = memo(() => {
    const navigate = useNavigate();

    const onClickSend = useCallback(() => navigate("/delete_comment/complete"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <>
            <p>コメント削除申請フォームです</p>
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickSend}>送信</Button>
        </>
    )
});