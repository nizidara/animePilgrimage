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

export type postAnimePhotoData = {
    place_id: string;
    user_id?: string | null;
}

export type postRealPhotoData = {
    place_id: string;
    user_id?: string | null;
    comment_id?: string | null;
}

export type updatePlaceIconData = {
    anime_photo_id: string;
    place_id?: string | null;
}

export type responseAnimePhotoData = postAnimePhotoData & {
    anime_photo_id: string;
    file_name: string;
    place_name: string;
    anime_id: number;
    anime_title: string;
    user_name?: string | null;
}

export type responseRealPhotoData = postRealPhotoData & {
    real_photo_id: string;
    file_name: string;
    place_name: string;
    anime_id: number;
    anime_title: string;
    user_name?: string | null;
}