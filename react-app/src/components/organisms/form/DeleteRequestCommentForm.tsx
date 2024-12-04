import { ChangeEvent, FC, memo, RefObject } from "react"
import { Form } from "react-bootstrap";
import { deleteCommentFormData } from "../../../type/form/comment";

type FormProps = {
    onFormChange: (data: deleteCommentFormData) => void;
    formData: deleteCommentFormData;
    setFormData: React.Dispatch<React.SetStateAction<deleteCommentFormData>>;
    formRef: RefObject<HTMLFormElement>;
};

export const DeleteRequestCommentForm: FC<FormProps> = memo((props) => {
    const {onFormChange, formData, setFormData, formRef} = props

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="deleteCommentFormContents">
                    <Form.Label>削除・通報理由※</Form.Label>
                    <Form.Control required as="textarea" name="contents" value={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className={`${formData.contents.length > 1000 ? "text-danger" : "text-muted"}`}>{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});