import { editAnimeFormData, registerAnimeFormData } from "../form/anime";

export type registerAnimeData = registerAnimeFormData & {
    flag: number;
}

export type editAnimeData = editAnimeFormData & {
    anime_id: number;
    request_date: string;
    request_type: number;
    user_id?: string | null;
}

export type responseAnimeData = {
    title: string;
    introduction?: string | null;
    kana: string;
    flag: number;
    anime_id: number;
}

export type responseEditAnimeData = editAnimeData & {
    request_anime_id: number;
    user_name?: string | null;
}