import {memo, FC, useCallback} from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate } from "react-router-dom";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_place"), [navigate]);
    const onClickDelete = useCallback(() => navigate("/delete_place"), [navigate]);

    const commentList = [
        { comment_id: 1, comment_date: new Date(2023, 1, 2, 11, 12), user_name: 'John', comment: 'This is my first tweet!' },
        { comment_id: 2, comment_date: new Date(2024, 3, 12, 1, 12), user_name: 'Alice', comment: 'Hello Twitter World!' },
        { comment_id: 3, comment_date: new Date(2024, 5, 22, 11, 12), user_name: 'Bob', comment: 'I love React Bootstrap!' },
        { comment_id: 4, comment_date: new Date(2024, 6, 1, 11, 1), user_name: 'Bob', comment: 'I love React Bootstrap!' },
        { comment_id: 5, comment_date: new Date(2025, 1, 2, 12, 12), user_name: 'Bob', comment: 'I love React Bootstrap!' },
        { comment_id: 6, comment_date: new Date(2025, 1, 2, 11, 12), user_name: 'Bob', comment: 'I love React Bootstrap!' },
    ];

    return (
        <Container>
            <h2>聖地詳細ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickEdit}>修正</Button> <Button variant="secondary" size="lg" onClick={onClickDelete}>削除</Button>
            <DisplayMap />
            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" />
            <PhotoCard title="リコリコ" name="すみだ水族館" />
            <CommentForm />
            <ListGroup>
                {commentList.map(comment => (
                    <ListGroup.Item key={comment.comment_id}>
                        <CommentCard user_name={comment.user_name} comment_date={comment.comment_date} comment={comment.comment} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
        </Container>
    )
});