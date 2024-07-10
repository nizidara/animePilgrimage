export type deleteComment ={
    contents: string;
}

export type responseCommentData = {
    comment: string;
    comment_date: string;
    user_id: string;
    range_id: number;
    place_id: string;
    comment_id: string;
}