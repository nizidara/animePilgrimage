import { FC, memo } from "react"
import { responseCommentData, responseDeleteCommentData } from "../../../type/api/comment";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { CommentCard } from "../card/CommentCard";
import { Col, Row } from "react-bootstrap";

type deleteCommentDetailData = Omit<responseDeleteCommentData, 'comment' | 'comment_id'> & {
    comment: responseCommentData
};

export const DeleteCommentDetailDisplay: FC<deleteCommentDetailData> = memo((props) => {
    const { delete_comment_id, request_date, user_name, user_id, contents, comment } = props;
    
    const buttonFlag = false;

    return (
        <>
            {comment && <CommentCard comment={comment} buttonFlag={buttonFlag}/>}
            <Row className="mb-2 mt-2">
                <Col xs={12} md={3}><b>お問い合わせID：</b></Col>
                <Col xs={12} md={9}>{delete_comment_id}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>お問い合わせ日時：</b></Col>
                <Col xs={12} md={9}><DateTimeFormatter datetime={request_date} /></Col>
            </Row>
            {user_name != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>ユーザー名：</b></Col>
                    <Col xs={12} md={9}>{user_name}({user_id})</Col>
                </Row>
            }
            <Row className="mb-2">
                <Col xs={12} md={3}><b>削除申請理由：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{contents}</Col>
            </Row>
        </>
    )
});