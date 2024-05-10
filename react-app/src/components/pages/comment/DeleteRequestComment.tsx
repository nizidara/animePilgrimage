import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { DeleteRequestCommentForm } from "../../organisms/form/DeleteRequestCommentForm";

export const DeleteRequestComment: FC = memo(() =>{
    return (
        <Container>
            <h2>コメント削除・通報申請</h2>
            <p>コメントの削除申請理由または通報理由を記載してください。</p>
            <DeleteRequestCommentForm />
        </Container>
    )
});