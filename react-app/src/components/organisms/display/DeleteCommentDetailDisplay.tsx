import { FC, memo } from "react"
import { deleteComment } from "../../../type/api/comment";


export const DeleteCommentDetailDisplay: FC<deleteComment> = memo((props) => {
    const {contents} = props;
    return (
        <>
            <p>削除申請理由</p>
            <p>{contents}</p>
        </>
    )
});