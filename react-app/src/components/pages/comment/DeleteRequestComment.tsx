import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { DeleteRequestCommentForm } from "../../organisms/form/DeleteRequestCommentForm";

export const DeleteRequestComment: FC = memo(() =>{
    return (
        <Container>
            <h2>コメント通報ページです．</h2>
            <DeleteRequestCommentForm />
        </Container>
    )
});