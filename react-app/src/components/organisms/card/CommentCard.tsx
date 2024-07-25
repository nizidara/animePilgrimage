import { FC, memo, useCallback } from "react"
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { responseCommentData } from "../../../type/api/comment";

type Comment = {
    comment: responseCommentData;
    buttonFlag: boolean;
}

export const CommentCard: FC<Comment> = memo((props) => {
    const navigate = useNavigate();

    const {comment, buttonFlag} = props
    const onClickDeleteComment = useCallback(() => navigate("/delete_comment", {state: {comment}}), [navigate]);

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
                    <Card.Text>{comment.comment}</Card.Text>
                    <div>{comment.file_name}</div>
                        {/* {tweet.image && <Card.Img src={tweet.image} alt="Tweet Image" />} */}
                 </Card.Body>
            </Card>
        </>
    )
});