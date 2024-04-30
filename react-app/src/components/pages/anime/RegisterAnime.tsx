import { memo, FC, useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAnime } from "../../../type/api/anime";

export const RegisterAnime: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { title: '', kana: '', introduction: '' };

    const [formData, setFormData] = useState<registerAnime>(initialFormData);

    const send = useCallback((formData:registerAnime) => navigate("/register_anime/confirmation", {state: {formData}}), [navigate]);

    //この場合は1つのみconsole出力
    //const send2 = useCallback((formData:registerAnime) => console.log(formData), []);

    const onClickNext = () => send(formData);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:registerAnime) => {
        setFormData(data); // フォームデータを更新
    };

    return (
        <Container>
            <h2>アニメ登録ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickRegisterPlace}>聖地申請はこちら</Button>
            <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData}/>
            <p>入力された内容: {JSON.stringify(formData)}</p>
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});