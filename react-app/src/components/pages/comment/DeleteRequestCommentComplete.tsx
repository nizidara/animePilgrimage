import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responseDeleteCommentData } from "../../../type/api/comment";
import { useGetCommenDetail } from "../../../hooks/comments/useGetCommentDetail";

export const DeleteRequestCommentComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseDeleteCommentData;

    const { comment } = useGetCommenDetail(responseData.comment_id);
    
    const onClickPlace = useCallback((placeId:string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    if(!comment){
        return <div>Comment Not Found</div>
    }

    return (
        <Container>
            <h2 className="mt-2">コメント削除・通報申請が完了しました</h2>
            <DeleteCommentDetailDisplay contents={responseData.contents} delete_comment_id={responseData.delete_comment_id} request_date={responseData.request_date} comment={comment} />
            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Button variant="primary" onClick={() => onClickPlace(comment.place_id)}>聖地情報に戻る</Button>
                </Col>
            </Row>
        </Container>
    )
});