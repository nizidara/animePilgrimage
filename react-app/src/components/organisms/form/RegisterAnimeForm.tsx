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
                    <Form.Control required type="text" name="title" defaultValue={formData.title} onChange={handleChange} />
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="registerFormKana">
                    <Form.Label>作品名（カナ）※</Form.Label>
                    <Form.Control required type="text" name="kana" defaultValue={formData.kana} onChange={handleChange} />
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="registerFormIntroduction">
                    <Form.Label>作品紹介※</Form.Label>
                    <Form.Control required type="text" name="introduction" defaultValue={formData.introduction} onChange={handleChange} />
                </Form.Group>
            </Form>
        </>
    )
});