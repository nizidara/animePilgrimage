import { FC, memo } from "react"
import { responseCommentData, responseDeleteCommentData } from "../../../type/api/comment";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { CommentCard } from "../card/CommentCard";

type deleteCommentDetailData = Omit<responseDeleteCommentData, 'comment' | 'comment_id'> & {
    comment: responseCommentData
};

export const DeleteCommentDetailDisplay: FC<deleteCommentDetailData> = memo((props) => {
    const { delete_comment_id, request_date, user_name, user_id, contents, comment } = props;
    
    const buttonFlag = false;

    return (
        <>
            {comment && <CommentCard comment={comment} buttonFlag={buttonFlag}/>}
            <p>お問い合わせID:{delete_comment_id}</p>
            <p>お問い合わせ日時:<DateTimeFormatter datetime={request_date} /></p>
            {user_name != null && <p>ユーザー名:{user_name}({user_id})</p>}
            <p>削除申請理由</p>
            <p>{contents}</p>
        </>
    )
});