import { FC, memo } from "react";
import { Form } from "react-bootstrap";
import { responseAnimeData } from "../../../type/api/anime";

type SearchAdminPlaceFormProps = {
    animeList: responseAnimeData[];
    selectedAnimeId: string | null;
    onAnimeChange: (animeId: string | null) => void;
}

export const SearchAdminPlaceForm: FC<SearchAdminPlaceFormProps> = memo(({ animeList, selectedAnimeId, onAnimeChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onAnimeChange(e.target.value || null);
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="animeTitle">
                <Form.Label>作品名</Form.Label>
                <Form.Select value={selectedAnimeId || ""} onChange={handleChange}>
                    <option value="">作品名を選択してください</option>
                    {animeList.map((anime) => (
                        <option key={anime.anime_id} value={anime.anime_id}>
                            {anime.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
});