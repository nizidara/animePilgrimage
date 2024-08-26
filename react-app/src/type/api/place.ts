import { editPlaceFormData, registerPlaceFormData } from "../form/place";

export type registerPlaceData = registerPlaceFormData & {
    flag: number;
    created_user_id?: string | null;
    edited_user_id?: string | null;
}

export type requestPlaceData = editPlaceFormData & {
    place_id: string
    request_date: string;
    request_type: number;
    user_id?: string | null;
}

export type photoData = {
    title: string;
    name: string;
    src: string;
}

export type responsePlaceData = Omit<registerPlaceData, 'images'> & {
    place_id: string;
    region_name: string;
    anime_title: string;
    created_user_name?: string | null;
    edited_user_name?: string | null;
    file_name?: string | null;
    anime_icon?: string | null;
    file_names: string[];
}

export type responseRequestPlaceData = requestPlaceData & {
    request_place_id: number;
    region_name: string;
    anime_title: string;
    anime_icon?: string | null;
    user_name?: string | null;
}