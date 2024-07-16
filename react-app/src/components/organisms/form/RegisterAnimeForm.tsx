import React, { ChangeEvent, FC, memo } from "react"
import { Form } from "react-bootstrap"
import { registerAnime } from "../../../type/api/anime";

type FormProps = {
    onFormChange: (data: registerAnime) => void;
    formData: registerAnime;
    setFormData: React.Dispatch<React.SetStateAction<registerAnime>>;
};

export const RegisterAnimeForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="registerFormTitle">
                    <Form.Label>作品名※</Form.Label>
                    <Form.Control required type="text" name="title" defaultValue={formData.title} maxLength={50} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.title.length} / 50 </Form.Text>
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="registerFormKana">
                    <Form.Label>作品名（カナ）※</Form.Label>
                    <Form.Control required type="text" name="kana" defaultValue={formData.kana} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.kana.length} / 200 </Form.Text>
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="registerFormIntroduction">
                    <Form.Label>作品紹介</Form.Label>
                    <Form.Control as="textarea" name="introduction" defaultValue={formData.introduction ? formData.introduction : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.introduction ? formData.introduction.length : 0} / 200 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});