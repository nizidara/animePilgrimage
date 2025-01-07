import { FC, memo, useCallback } from "react"
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { responseCommentData } from "../../../type/api/comment";
import { Photo } from "../../atoms/Photo";

type Comment = {
    comment: responseCommentData;
    buttonFlag: boolean;
}

export const CommentCard: FC<Comment> = memo((props) => {
    const navigate = useNavigate();

    const {comment, buttonFlag} = props
    const onClickDeleteComment = useCallback(() => navigate("/delete_comment", {state: {comment}}), [navigate, comment]);
    
    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        <strong>{comment.user_name}</strong> <DateTimeFormatter datetime={comment.comment_date}/>
                    </div>
                    {buttonFlag && <Button variant="danger" className="float-right" onClick={onClickDeleteComment}>削除</Button>}
                </Card.Header>
                <Card.Body>
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>{comment.comment}</Card.Text>
                    {comment.file_names && comment.file_names.map((file, index) => (
                        <Photo key={index} file_name={file} />
                    ))}
                 </Card.Body>
            </Card>
        </>
    )
});