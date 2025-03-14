import { useCallback, useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseAnimePhotoData } from "../../type/api/photo";

export const useGetAnimePhotoList = (place_id: string | null, page: number = 1, page_size: number = 12, canFetch: boolean) => {
    const [animePhotoList, setAnimePhotoList] = useState<responseAnimePhotoData[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnimePhotos = useCallback(() => {
        const queryPage = `?page=${page}`;
        const queryPageSize = `&page_size=${page_size}`;

        if(place_id && canFetch){
            axios.get(`${fastAPIURL}/photos/anime/list/${place_id}${queryPage}${queryPageSize}`)
            .then(response => {
                setAnimePhotoList(response.data.photos);
                setTotalCount(response.data.total_count);
                setLoading(false);
            })
            .catch(() => {
                setError("写真取得中にエラーが発生しました");
                setLoading(false);
            });
        }
    }, [place_id, page, page_size, canFetch]);

    useEffect(() => {
        fetchAnimePhotos();
    }, [fetchAnimePhotos])

  return { animePhotoList, totalCount, loading, error, fetchAnimePhotos };
};