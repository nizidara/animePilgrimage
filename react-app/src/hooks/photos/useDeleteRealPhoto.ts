import { useState } from "react";
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";

type UseDeletePhotoReturnType = {
    deleteRealPhotos: (photoIds: string[], onRealPhotoPosted: () => void) => Promise<void>;
    loading: boolean;
    error: string | null;
};

export const useDeleteRealPhoto = (): UseDeletePhotoReturnType => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const url = fastAPIURL;

    const deleteRealPhotos = async (photoIds: string[], onRealPhotoPosted: () => void) => {
        setLoading(true);
        setError(null);

        try {
            const deletePromises = photoIds.map(photoId => 
                axios.delete(url + `/photos/reals/${photoId}`)
            );
            await Promise.all(deletePromises);

            // 削除成功後にコールバックを実行
            onRealPhotoPosted();
        } catch (err) {
            setError("写真の削除に失敗しました");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { deleteRealPhotos, loading, error };
};
