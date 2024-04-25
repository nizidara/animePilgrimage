import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";

export const DeleteRequestCommentComplete: FC = memo(() =>{
    return (
        <Container>
            <h2>コメント通報完了ページです．</h2>
            <DeleteCommentDetailDisplay />
        </Container>
    )
});