import React, { ChangeEvent, FC, memo, RefObject } from "react"
import { Form } from "react-bootstrap"
import { editAnimeFormData } from "../../../type/form/anime";
import { Icon } from "../../atoms/Icon";
import { ImagePreview } from "../../molecules/ImagePreview";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";

type FormProps = {
    onFormChange: (data: editAnimeFormData) => void;
    formData: editAnimeFormData;
    setFormData: React.Dispatch<React.SetStateAction<editAnimeFormData>>;
    formRef: RefObject<HTMLFormElement>;
    anime_icon?: string | null;
};

export const EditAnimeForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, formRef, anime_icon }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prevInputData => ({ ...prevInputData, icon: file }));
        onFormChange({ ...formData, icon: file });
    };

    const handleRemoveIcon = () => {
        setFormData(prevInputData => ({ ...prevInputData, icon: null }));
        onFormChange({ ...formData, icon: null });
    };

    return (
        <>
            <Form ref={formRef}>
                <Form.Group className="mb-3" controlId="editFormTitle">
                    <Form.Label>作品名</Form.Label>
                    <Form.Control disabled readOnly type="text" name="title" defaultValue={formData.title} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="editFormIntroduction">
                    <Form.Label>作品紹介</Form.Label>
                    <Form.Control as="textarea" name="introduction" defaultValue={formData.introduction ? formData.introduction : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.introduction ? formData.introduction.length : 0} / 200 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="editFormContents">
                    <Form.Label>リクエスト理由※（タイトル修正はこちらに記載してください）</Form.Label>
                    <Form.Control required as="textarea" name="contents" defaultValue={formData.contents} maxLength={1000} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.contents ? formData.contents.length : 0} / 1000 </Form.Text>
                </Form.Group>

                {anime_icon && 
                    <div>
                        <p>現在のアイコン</p>
                        <Icon file_name={anime_icon} />
                    </div>
                }
                <Form.Group className="mb-3 mt-3" controlId="registerFormIcon">
                    <Form.Label>修正用アイコン（任意）</Form.Label><br />
                    <Form.Label>
                        <FileUploadIcon />
                    </Form.Label>
                    <Form.Control type="file" name="icon" hidden onChange={handleFileChange} />
                </Form.Group>
                {formData.icon && <ImagePreview image={formData.icon} handleRemoveIcon={handleRemoveIcon} />}
            </Form>
        </>
    )
});