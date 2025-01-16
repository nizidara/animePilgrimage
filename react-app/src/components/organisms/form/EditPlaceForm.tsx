import { ChangeEvent, FC, memo, RefObject } from "react"
import { SearchMap } from "../map/SearchMap";
import { Alert, Form, Spinner } from "react-bootstrap";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";
import { editPlaceFormData } from "../../../type/form/place";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { PhotoCard } from "../card/PhotoCard";
import { BsInfoCircle } from "react-icons/bs";

type FormProps = {
    onFormChange: (data: editPlaceFormData) => void;
    formData: editPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<editPlaceFormData>>;
    animeTitle: string;
    animePhoto: string[];
    formRef: RefObject<HTMLFormElement>;
};

export const EditPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, animeTitle, animePhoto, formRef }) => {
    const { regionList, loading, error } = useGetRegionList();
    
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

    // 緯度経度更新
    const handleCoords = (latitude: number, longitude: number) => {
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                latitude: latitude,
                longitude: longitude,
            };
            onFormChange(updatedData);
            return updatedData;
        });
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (loading) return <center><Spinner animation="border" /></center>;

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

                <p>MAP※ <small className="text-muted">({formData.latitude}, {formData.longitude})</small><br />
                <small className="text-muted"><BsInfoCircle /> MAP上に表示されたマーカーを目的の聖地の場所まで移動させてください。<br />
                再検索が必要な場合は、検索フォームに近くのランドマーク名を入力して検索ボタンをクリックし、MAP上に表示されたマーカーを目的の聖地の場所まで移動させてください。</small></p>
                {mapboxFlag ? <SearchMap onSelectCoords={handleCoords} longitude={formData.longitude} latitude={formData.latitude} /> : <DummyMap />}

                <Form.Group className="mb-3" controlId="editPlaceFormComment">
                    <Form.Label>紹介コメント※</Form.Label>
                    <Form.Control required as="textarea" name="comment" defaultValue={formData.comment ? formData.comment : ""} maxLength={200} onChange={handleChange} rows={3} />
                    <Form.Text className={`${formData.comment && formData.comment.length > 200 ? "text-danger" : "text-muted"}`}>{formData.comment ? formData.comment.length : 0} / 200 </Form.Text>
                </Form.Group>
                
                {animePhoto.length !==0 && 
                    <div>
                        <p>作中写真（写真追加・アイコン修正は左上の<b>「写真追加はこちら」</b>ボタンからお願いします）</p>
                        <PhotoCard file_names={animePhoto} />
                    </div>
                }

                <Form.Group className="mb-3" controlId="editPlaceFormContents">
                    <Form.Label>リクエスト理由※（作品名の修正・画像削除はこちらに記載してください）</Form.Label>
                    <Form.Control required as="textarea" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} rows={5} />
                    <Form.Text className={`${formData.contents.length > 1000 ? "text-danger" : "text-muted"}`}>{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});