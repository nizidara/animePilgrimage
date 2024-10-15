export type registerPlaceFormData = {
    anime_id: number;
    name: string;
    latitude: number;
    longitude: number;
    comment?: string | null;
    region_id: number;
    images: File[];
    icon_index: number | null;
}

export type editPlaceFormData = {
    anime_id: number;
    name: string;
    latitude: number;
    longitude: number;
    comment?: string | null;
    contents: string;
    region_id: number;
}

export type deletePlaceFormData ={
    contents: string;
}