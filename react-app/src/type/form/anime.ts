export type registerAnimeFormData = {
    title: string;
    kana: string;
    introduction?: string | null;
    icon?: File | null;
}

export type editAnimeFormData = {
    title: string;
    introduction?: string | null;
    contents: string;
    icon?: File | null;
}