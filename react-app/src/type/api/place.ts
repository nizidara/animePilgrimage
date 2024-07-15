export type deletePlace ={
    contents: string;
}

export type registerPlace ={
    name: string;
    animeId: number;
    regionId: number;
    comment: string;
}

export type photoData = {
    title: string;
    name: string;
    src: string;
}

export type responsePlaceData = {
    anime_id: number;
    name: string;
    latitude: number;
    longitude:number;
    comment: string;
    flag: number;
    region_id: number;
    created_user_id: string;
    edited_user_id: string;
    place_id: string;
    region_name: string;
    anime_title: string;
    created_user_name: string;
    edited_user_name: string;
}