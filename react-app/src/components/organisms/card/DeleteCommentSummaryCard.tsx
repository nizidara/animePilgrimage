import { FC, memo } from "react"
import { Card } from "react-bootstrap";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";

import '../../../thema/card/CardStyles.css';
import { responseDeleteCommentData } from "../../../type/api/comment";

type deleteCommentSummary = responseDeleteCommentData & {
    onClickDetail: (deleteCommentId: number, commentId: string) => void;
};

export const DeleteCommentSummaryCard: FC<deleteCommentSummary> = memo((props) => {
    const {comment_id, comment, delete_comment_id, onClickDetail, contents, request_date, user_id, user_name} = props;

    return (
        <>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        {user_name}({user_id})
                    </div>
                    <small className="text-muted"><DateTimeFormatter datetime={request_date} /></small>
                </Card.Header>
                <Card.Body className="clickable-card" onClick={() => onClickDetail(delete_comment_id, comment_id)}>
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>
                        {comment != null && comment}
                    </Card.Text>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>リクエスト理由</Card.Title>
                    </div>
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>
                        {contents}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
});