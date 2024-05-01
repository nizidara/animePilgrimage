import { ChangeEvent, FC, memo } from "react"
import { deletePlace } from "../../../type/api/place";
import { Form } from "react-bootstrap";

type FormProps = {
    onFormChange: (data: deletePlace) => void;
    formData: deletePlace;
    setFormData: React.Dispatch<React.SetStateAction<deletePlace>>;
};

export const DeleteRequestPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };
    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="deletePlaceFormContents">
                    <Form.Label>削除申請理由※</Form.Label>
                    <Form.Control required type="text" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});