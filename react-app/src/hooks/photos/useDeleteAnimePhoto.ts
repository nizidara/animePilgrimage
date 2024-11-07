import { useState } from "react";
import { fastAPIURL } from "../../properties/properties";
import api from "../../api/axiosInstance";

type UseDeletePhotoReturnType = {
    deleteAnimePhotos: (photoIds: string[], onAnimePhotoPosted: () => void) => Promise<void>;
    loading: boolean;
    error: string | null;
};

export const useDeleteAnimePhoto = (): UseDeletePhotoReturnType => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    const deleteAnimePhotos = async (photoIds: string[], onAnimePhotoPosted: () => void) => {
        setLoading(true);
        setError(null);

        try {
            const deletePromises = photoIds.map(photoId => 
                api.delete(url + `/photos/anime/${photoId}`)
            );
            await Promise.all(deletePromises);

            // 削除成功後にコールバックを実行
            onAnimePhotoPosted();

        } catch (err) {
            setError("写真の削除に失敗しました");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteAnimePhotos, loading, error };
};
