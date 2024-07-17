import React, { ChangeEvent, FC, memo } from "react"
import { Form } from "react-bootstrap"
import { editAnimeFormData } from "../../../type/form/anime";

type FormProps = {
    onFormChange: (data: editAnimeFormData) => void;
    formData: editAnimeFormData;
    setFormData: React.Dispatch<React.SetStateAction<editAnimeFormData>>;
};

export const EditAnimeForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="editFormTitle">
                    <Form.Label>作品名</Form.Label>
                    <Form.Control disabled readOnly type="text" name="title" defaultValue={formData.title} />
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="editFormIntroduction">
                    <Form.Label>作品紹介</Form.Label>
                    <Form.Control as="textarea" name="introduction" defaultValue={formData.introduction ? formData.introduction : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.introduction ? formData.introduction.length : 0} / 200 </Form.Text>
                </Form.Group>
            </Form>

            <Form>
                <Form.Group className="mb-3" controlId="editFormContents">
                    <Form.Label>リクエスト理由（タイトル修正はこちらに記載してください）</Form.Label>
                    <Form.Control as="textarea" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.contents ? formData.contents.length : 0} / 1000 </Form.Text>
                </Form.Group>
            </Form>
        </>
    )
});