import React, { ChangeEvent, FC, memo, RefObject } from "react"
import { Form } from "react-bootstrap"
import { registerAnimeFormData } from "../../../type/form/anime";

type FormProps = {
    onFormChange: (data: registerAnimeFormData) => void;
    formData: registerAnimeFormData;
    setFormData: React.Dispatch<React.SetStateAction<registerAnimeFormData>>;
    formRef: RefObject<HTMLFormElement>;
};

export const RegisterAnimeForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, formRef }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="registerFormTitle">
                    <Form.Label>作品名※</Form.Label>
                    <Form.Control required type="text" name="title" defaultValue={formData.title} maxLength={50} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.title.length} / 50 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerFormKana">
                    <Form.Label>作品名（カナ）※</Form.Label>
                    <Form.Control required type="text" name="kana" defaultValue={formData.kana} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.kana.length} / 200 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerFormIntroduction">
                    <Form.Label>作品紹介</Form.Label>
                    <Form.Control as="textarea" name="introduction" defaultValue={formData.introduction ? formData.introduction : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.introduction ? formData.introduction.length : 0} / 200 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});