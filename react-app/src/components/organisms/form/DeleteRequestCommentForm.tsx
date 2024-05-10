import { ChangeEvent, FC, memo, useCallback, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteComment } from "../../../type/api/comment";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";


export const DeleteRequestCommentForm: FC = memo(() => {
    const navigate = useNavigate();

    const [contents, setContents] = useState('');

    const onChangeContents = (e:ChangeEvent<HTMLInputElement>) => setContents(e.target.value);

    const send = useCallback((formData:deleteComment) => navigate("/delete_comment/complete", {state: {formData}}), [navigate]);
    const formData = {contents} as deleteComment;

    const onClickSend = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>削除・通報理由※</Form.Label>
                    <Form.Control as="textarea" name="contents" value={contents} maxLength={1000} onChange={onChangeContents} />
                    <Form.Text className="text-muted">{formData.contents.length} / 1000 </Form.Text>
                </Form.Group>
                <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} />
            </Form>
        </>
    )
});