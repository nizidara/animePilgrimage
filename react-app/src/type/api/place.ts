import { editPlaceFormData, registerPlaceFormData } from "../form/place";

export type registerPlaceData = registerPlaceFormData & {
    flag: number;
    created_user_id?: string | null;
    edited_user_id?: string | null;
}

export type editAdminPlaceData = Omit<registerPlaceData, 'images' | 'icon_index'>

export type requestPlaceData = editPlaceFormData & {
    place_id: string;
    request_type: number;
    user_id?: string | null;
}

export type photoData = {
    title: string;
    name: string;
    src: string;
}

export type responsePlaceData = Omit<registerPlaceData, 'images' | 'icon_index'> & {
    place_id: string;
    region_name: string;
    anime_title: string;
    created_user_name?: string | null;
    edited_user_name?: string | null;
    place_icon?: string | null;
    anime_icon?: string | null;
    file_names: string[];
}

export type responseRequestPlaceData = requestPlaceData & {
    request_date: string;
    request_place_id: number;
    region_name: string;
    anime_title: string;
    anime_icon?: string | null;
    user_name?: string | null;
}