import { FC, memo, useCallback } from "react"
import { Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";

type Comment = {
    user_name?: string;
    comment_date: string;
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
                        <strong>{user_name}</strong> <DateTimeFormatter datetime={comment_date}/>
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