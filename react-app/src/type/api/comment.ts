export type deleteComment ={
    contents: string;
}

export type responseCommentData = {
    comment: string;
    comment_date: string;
    user_id?: string | null;
    range_id: number;
    place_id: string;
    comment_id: string;
    anime_id: number;
    anime_title: string;
    place_name: string;
    range_name: string;
    user_name?: string | null;
}