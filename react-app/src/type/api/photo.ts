export type responseAnimeIconData = {
    file_name?: string | null;
    anime_id: number;
    title: string;
}

export type responsePlaceIconData = {
    anime_photo_id: string;
    place_id: string;
    file_name: string;
    place_name: string;
}

export type registerAnimePhotoData = {
    file_name: string;
    place_id: string;
    user_id?: string | null;
}

export type registerRealPhotoData = {
    file_name: string;
    place_id: string;
    user_id?: string | null;
    comment_id?: string | null;
}

export type responseAnimePhotoData = registerAnimePhotoData & {
    anime_photo_id: string;
    place_name: string;
    anime_id: number;
    anime_title: string;
    user_name?: string | null;
}

export type responseRealPhotoData = registerRealPhotoData & {
    real_photo_id: string;
    place_name: string;
    anime_id: number;
    anime_title: string;
    user_name?: string | null;
}