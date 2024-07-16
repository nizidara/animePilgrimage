export type registerAnime = {
    title: string;
    kana: string;
    introduction?: string | null;
}

export type responseAnimeData = {
    title: string;
    introduction?: string | null;
    kana: string;
    flag: number;
    anime_id: number;
}