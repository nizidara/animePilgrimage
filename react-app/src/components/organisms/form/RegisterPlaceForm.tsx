import { ChangeEvent, FC, KeyboardEvent, memo, RefObject } from "react"
import { SearchMap } from "../map/SearchMap";
import { Form } from "react-bootstrap";
import { registerPlaceFormData } from "../../../type/form/place";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";

type FormProps = {
    onFormChange: (data: registerPlaceFormData) => void;
    formData: registerPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<registerPlaceFormData>>;
    formRef: RefObject<HTMLFormElement>;
};

export const RegisterPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, formRef }) => {
    const { animeList } = useGetAnimeList();
    const { regionList } = useGetRegionList();
    
    //入力フォーム更新
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    //選択フォーム更新
    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <Form ref={formRef} onKeyDown={handleKeyDown}>
                <Form.Group className="mb-3" controlId="registerPlaceFormName">
                    <Form.Label>聖地名※</Form.Label>
                    <Form.Control required type="text" name="name" defaultValue={formData.name} maxLength={30} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.name.length} / 30 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPlaceSelectTitle">
                    <Form.Label>作品名※</Form.Label>
                    <Form.Select required className="mb-3" name="anime_id" value={formData.anime_id} onChange={selectChange}>
                        <option value="">作品名を選択してください</option>
                        {animeList.map(anime => (
                            <option key={anime.anime_id} value={anime.anime_id}>{anime.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPlaceSelectRegion">
                    <Form.Label>都道府県名※</Form.Label>
                    <Form.Select required className="mb-3" name="region_id" value={formData.region_id} onChange={selectChange}>
                        <option value="">都道府県を選択してください</option>
                        {regionList.map(region => (
                            <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <SearchMap />

                <Form.Group className="mb-3" controlId="registerPlaceFormComment">
                    <Form.Label>紹介コメント※</Form.Label>
                    <Form.Control required as="textarea" name="comment" defaultValue={formData.comment ? formData.comment : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.comment ? formData.comment.length : 0} / 200 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});