export type registerAnimeFormData = {
    title: string;
    kana: string;
    introduction?: string | null;
}

export type editAnimeFormData = {
    title: string;
    introduction?: string | null;
    contents: string;
}