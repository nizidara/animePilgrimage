import { ChangeEvent, FC, memo, RefObject } from "react"
import { SearchMap } from "../map/SearchMap";
import { Form } from "react-bootstrap";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";
import { editPlaceFormData } from "../../../type/form/place";

type FormProps = {
    onFormChange: (data: editPlaceFormData) => void;
    formData: editPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<editPlaceFormData>>;
    animeTitle: string;
    formRef: RefObject<HTMLFormElement>;
};

export const EditPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, animeTitle, formRef }) => {
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

    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="editPlaceFormName">
                    <Form.Label>聖地名※</Form.Label>
                    <Form.Control required type="text" name="name" defaultValue={formData.name} maxLength={30} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.name.length} / 30 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editFormTitle">
                    <Form.Label>作品名</Form.Label>
                    <Form.Control disabled readOnly type="text" name="anime_id" defaultValue={animeTitle} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="editPlaceSelectRegion">
                    <Form.Label>都道府県名※</Form.Label>
                    <Form.Select required className="mb-3" name="region_id" value={formData.region_id} onChange={selectChange}>
                        <option value="">都道府県を選択してください</option>
                        {regionList.map(region => (
                            <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <SearchMap />

                <Form.Group className="mb-3" controlId="editPlaceFormComment">
                    <Form.Label>紹介コメント※</Form.Label>
                    <Form.Control required as="textarea" name="comment" defaultValue={formData.comment ? formData.comment : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.comment ? formData.comment.length : 0} / 200 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editPlaceFormContents">
                    <Form.Label>リクエスト理由※（作品名の修正はこちらに記載してください）</Form.Label>
                    <Form.Control required as="textarea" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.contents ? formData.contents.length : 0} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});