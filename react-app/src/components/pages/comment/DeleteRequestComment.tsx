import {memo, FC, useState, useCallback, useRef} from "react";
import { Container } from "react-bootstrap";
import { DeleteRequestCommentForm } from "../../organisms/form/DeleteRequestCommentForm";
import { useLocation, useNavigate } from "react-router-dom";
import { responseCommentData } from "../../../type/api/comment";
import { CommentCard } from "../../organisms/card/CommentCard";
import { deleteCommentFormData } from "../../../type/form/comment";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useDeleteRequestComment } from "../../../hooks/comments/useDeleteRequestComment";

export const DeleteRequestComment: FC = memo(() =>{
    const location = useLocation();
    const navigate = useNavigate();
    
    const comment = location.state.comment as responseCommentData;
    const commentId = comment.comment_id;
    const buttonFlag = false;

    const {post} = useDeleteRequestComment();

    //formData
    const [formData, setFormData] = useState<deleteCommentFormData>({ contents: ''});
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:deleteCommentFormData) => {
        setFormData(data); // updateFormData
    };

    //page transition
    const onClickSend = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                post(formData, commentId);
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>コメント削除・通報申請</h2>
            <CommentCard comment={comment} buttonFlag={buttonFlag} />
            <DeleteRequestCommentForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} />
            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});