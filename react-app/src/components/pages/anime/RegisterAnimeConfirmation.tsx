import { memo, FC, useCallback } from "react";
import { Container, Image } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerAnimeFormData } from "../../../type/form/anime";
import { useRegisterAnime } from "../../../hooks/anime/useRegisterAnime";

export const RegisterAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const {register} = useRegisterAnime();
    const back = useCallback((formData:registerAnimeFormData) => navigate("/register_anime", {state: {formData}}), [navigate]);

    //registration contents
    const registerAnimeFormData = location.state.formData as registerAnimeFormData;

    const onClickBack = () => back(registerAnimeFormData);
    const onClickSend = () => register(registerAnimeFormData);

    return (
        <Container>
            <h2>新規アニメ登録申請 内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            <RegisterAnimeDetailDisplay title={registerAnimeFormData.title} kana={registerAnimeFormData.kana} introduction={registerAnimeFormData.introduction} icon={registerAnimeFormData.icon} />

            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});