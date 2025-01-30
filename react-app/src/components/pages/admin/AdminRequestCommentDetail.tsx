import { memo, FC, useCallback } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetCommentDetail } from "../../../hooks/comments/useGetCommentDetail";
import { useAdminGetReportCommentDetail } from "../../../hooks/comments/useAdminGetReqportCommentDetail";
import { useAdminApproveReportComment } from "../../../hooks/comments/useAdminApproveReportComment";
import { useAdminDeclineReportComment } from "../../../hooks/comments/useAdminDeclineReportComment";
import { DeleteCommentDetailDisplay } from "../../organisms/display/DeleteCommentDetailDisplay";

export const AdminRequestCommentDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const reportCommentId = searchParams.get('delete_comment_id');
    const commentId = searchParams.get('comment_id');

    const { comment, loading:commentLoading, error:commentError } = useGetCommentDetail(commentId);
    const { reportComment, loading, error } = useAdminGetReportCommentDetail(reportCommentId);
    const { approve, approveError } = useAdminApproveReportComment();
    const { decline, declineError } = useAdminDeclineReportComment();

    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const onClickApprove = (reportCommentId: string) => {approve(reportCommentId)};
    const onClickDecline = (reportCommentId: string) => {decline(reportCommentId)};

    
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (commentError) return <Alert variant="danger">{commentError}</Alert>;
    if (!reportCommentId) {
        return <div>No Anime found</div>;
    }

    return (
        <Container>
            <h2>通報情報</h2>
            {(loading && commentLoading) ? <center><Spinner animation="border" /></center> :
                (reportComment && comment &&
                    <DeleteCommentDetailDisplay 
                        contents={reportComment.contents}
                        delete_comment_id={reportComment.delete_comment_id}
                        request_date={reportComment.request_date}
                        comment={comment}
                    />
                )
            }
            {approveError && <Alert variant="danger">{approveError}</Alert>}
            {declineError && <Alert variant="danger">{declineError}</Alert>}
            
            <BackAndNextButtons backName="却下" nextName="承認" onClickBack={() => onClickDecline(reportCommentId)} onClickNext={() => onClickApprove(reportCommentId)} />
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickBack}>戻る</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
            </div>
        </Container>
    )
});