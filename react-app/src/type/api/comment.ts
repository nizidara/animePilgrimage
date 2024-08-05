import { deleteCommentFormData, postCommentFormData } from "../form/comment";

export type postCommentData = postCommentFormData & {
    comment_date: string;
    user_id?: string | null;
    range_id: number;
    place_id: string;
}

export type deleteCommentData = deleteCommentFormData & {
    comment_id: string;
    request_date: string;
    user_id?: string | null;
}

export type responseCommentData = postCommentData & {
    comment_id: string;
    anime_id: number;
    anime_title: string;
    place_name: string;
    range_name: string;
    user_name?: string | null;
    file_names?: string[] | null;
}

export type responseDeleteCommentData = deleteCommentData & {
    delete_comment_id: number;
    comment: string;
    user_name?: string | null;
}