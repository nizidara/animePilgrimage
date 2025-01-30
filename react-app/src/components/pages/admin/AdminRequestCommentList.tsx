import { memo, FC, useCallback } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAdminGetReportCommentList } from "../../../hooks/comments/useAdminGetReportCommentList";
import { DeleteCommentSummaryCard } from "../../organisms/card/DeleteCommentSummaryCard";

export const AdminRequestCommentList: FC = memo(() =>{
    const { reportCommentList, loading, error } = useAdminGetReportCommentList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((reportCommentId: number, commentId: string) => navigate(`/admin/report_comment?delete_comment_id=${reportCommentId}&comment_id=${commentId}`), [navigate]);

    return (
        <Container>
            <h2>通報コメント内容一覧</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
                <ListGroup>
                    {reportCommentList.map(report => (
                    <ListGroup.Item key={report.delete_comment_id}>
                        <DeleteCommentSummaryCard 
                            delete_comment_id={report.delete_comment_id}
                            comment={report.comment}
                            comment_id={report.comment_id}
                            onClickDetail={onClickDetail}
                            request_date={report.request_date}
                            user_id={report.user_id}
                            user_name={report.user_name} 
                            contents={report.contents}  
                        />
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            }
        </Container>
    )
});