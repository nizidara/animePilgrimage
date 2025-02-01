import { memo, FC, useState, useCallback, useRef } from "react";
import { Alert, Container } from "react-bootstrap";
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {request, requestError} = useDeleteRequestComment();

    //formData
    const [formData, setFormData] = useState<deleteCommentFormData>({ contents: ''});
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:deleteCommentFormData) => {
        setFormData(data); // updateFormData
    };

    //page transition
    const onClickSend = () => {
        if (formRef.current) {
            if (isSubmitting) return; // 連打防止
            setIsSubmitting(true);
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                request(formData, commentId, () => setIsSubmitting(false));
            }
        }
    }
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2 className="mt-2">コメント削除・通報申請</h2>
            <CommentCard comment={comment} buttonFlag={buttonFlag} />
            {requestError && <Alert variant="danger">{requestError}</Alert>}
            <DeleteRequestCommentForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef} />
            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
        </Container>
    )
});