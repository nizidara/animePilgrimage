import { ChangeEvent, FC, memo } from "react"
import { Form } from "react-bootstrap";
import { deleteCommentFormData } from "../../../type/form/comment";

type FormProps = {
    onFormChange: (data: deleteCommentFormData) => void;
    formData: deleteCommentFormData;
    setFormData: React.Dispatch<React.SetStateAction<deleteCommentFormData>>;
};

export const DeleteRequestCommentForm: FC<FormProps> = memo((props) => {
    const {onFormChange, formData, setFormData} = props

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>削除・通報理由※</Form.Label>
                    <Form.Control as="textarea" name="contents" value={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});