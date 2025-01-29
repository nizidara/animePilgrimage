import { deleteCommentFormData, postCommentFormData } from "../form/comment";

export type postCommentData = postCommentFormData & {
    user_id?: string | null;
    range_id: number;
    place_id: string;
}

export type deleteCommentData = deleteCommentFormData & {
    comment_id: string;
    user_id?: string | null;
}

export type responseCommentData = postCommentData & {
    comment_id: string;
    comment_date: string;
    anime_id: number;
    anime_title: string;
    place_name: string;
    range_name: string;
    user_name?: string | null;
    file_names?: string[] | null;
}

export type responseDeleteCommentData = deleteCommentData & {
    delete_comment_id: number;
    request_date: string;
    comment: string;
    user_name?: string | null;
}