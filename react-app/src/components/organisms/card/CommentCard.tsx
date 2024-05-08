import { FC, memo, useCallback } from "react"
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Comment = {
    user_name: string;
    comment_date: Date;
    comment: string;
}

export const CommentCard: FC<Comment> = memo((props) => {
    const navigate = useNavigate();

    const onClickDeleteComment = useCallback(() => navigate("/delete_comment"), [navigate]);

    const {user_name, comment_date, comment} = props

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        <strong>{user_name}</strong> <small className="text-muted">{comment_date.toLocaleDateString()} {comment_date.getHours()}:{comment_date.getMinutes()}</small>
                    </div>
                    <Button variant="danger" className="float-right" onClick={onClickDeleteComment}>削除</Button>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{comment}</Card.Text>
                        {/* {tweet.image && <Card.Img src={tweet.image} alt="Tweet Image" />} */}
                 </Card.Body>
            </Card>
        </>
    )
});