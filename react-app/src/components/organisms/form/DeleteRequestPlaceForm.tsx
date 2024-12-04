import { ChangeEvent, FC, memo, RefObject } from "react"
import { Form } from "react-bootstrap";
import { deletePlaceFormData } from "../../../type/form/place";

type FormProps = {
    onFormChange: (data: deletePlaceFormData) => void;
    formData: deletePlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<deletePlaceFormData>>;
    formRef: RefObject<HTMLFormElement>;
};

export const DeleteRequestPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, formRef }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };
    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3 mt-3" controlId="deletePlaceFormContents">
                    <Form.Label>削除申請理由※</Form.Label>
                    <Form.Control required as="textarea" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className={`${formData.contents.length > 1000 ? "text-danger" : "text-muted"}`}>{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});