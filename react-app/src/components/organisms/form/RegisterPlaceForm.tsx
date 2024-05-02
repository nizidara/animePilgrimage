import { ChangeEvent, FC, memo } from "react"
import { SearchMap } from "../map/SearchMap";
import { registerPlace } from "../../../type/api/place";
import { Form } from "react-bootstrap";

type FormProps = {
    onFormChange: (data: registerPlace) => void;
    formData: registerPlace;
    setFormData: React.Dispatch<React.SetStateAction<registerPlace>>;
};

export const RegisterPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData }) => {
    
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
            <Form>
                <Form.Group className="mb-3" controlId="registerPlaceFormName">
                    <Form.Label>聖地名※</Form.Label>
                    <Form.Control required type="text" name="name" defaultValue={formData.name} maxLength={30} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.name.length} / 30 </Form.Text>
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="registerPlaceSelectTitle">
                    <Form.Label>作品名※</Form.Label>
                    <Form.Select className="mb-3" name="animeId" value={formData.animeId} onChange={selectChange}>
                        <option>作品名を選択してください</option>
                        <option value="A01">リコリコ</option>
                        <option value="A02">青ブタ</option>
                        <option value="A03">ユーフォ</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            
            <Form>
                <Form.Group className="mb-3" controlId="registerPlaceSelectRegion">
                    <Form.Label>都道府県名※</Form.Label>
                    <Form.Select className="mb-3" name="regionId" value={formData.regionId} onChange={selectChange}>
                        <option>都道府県を選択してください</option>
                        <option value="R01">北海道</option>
                        <option value="R02">東京都</option>
                        <option value="R03">海外</option>
                    </Form.Select>
                </Form.Group>
            </Form>



            <SearchMap />

            <Form>
                <Form.Group className="mb-3" controlId="registerPlaceFormComment">
                    <Form.Label>紹介コメント※</Form.Label>
                    <Form.Control required as="textarea" name="comment" defaultValue={formData.comment} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.comment.length} / 200 </Form.Text>
                </Form.Group>
            </Form>
            
        </>
    )
});