import { memo, FC, useCallback } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responseDeleteCommentData } from "../../../type/api/comment";
import { useGetCommentDetail } from "../../../hooks/comments/useGetCommentDetail";
import { Helmet } from "react-helmet-async";

export const DeleteRequestCommentComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseDeleteCommentData;

    const { comment, loading, error } = useGetCommentDetail(responseData.comment_id);
    
    const onClickPlace = useCallback((placeId:string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    if(!comment){
        return <center><Spinner animation="border" /></center>;
    }

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "コメント通報 完了",
        "description": `コメントの通報が完了しました。`,
        "url": `https://pilgrimage.nizidara.com/delete_comment/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"コメント通報 完了"}</title>
                <meta name="description" content={`コメントの通報が完了しました。 - にじげんたび`} />
                <meta property="og:title" content={`コメント通報 完了 - にじげんたび`} />
                <meta property="og:description" content={`コメントの通報が完了しました。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">コメント削除・通報申請が完了しました</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? <center><Spinner animation="border" /></center> :
                    <DeleteCommentDetailDisplay contents={responseData.contents} delete_comment_id={responseData.delete_comment_id} request_date={responseData.request_date} comment={comment} />
                }
                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => onClickPlace(comment.place_id)}>聖地情報に戻る</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
});