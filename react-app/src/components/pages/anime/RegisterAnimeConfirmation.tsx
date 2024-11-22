import { memo, FC, useCallback } from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useRegisterAnime } from "../../../hooks/anime/useRegisterAnime";
import { useRegisterAnimeContext } from "../../../providers/RegisterAnimeContext";

export const RegisterAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const { formData } = useRegisterAnimeContext();
    
    const { register } = useRegisterAnime();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => register(formData);

    return (
        <Container>
            <h2>新規アニメ登録申請 内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            <RegisterAnimeDetailDisplay title={formData.title} kana={formData.kana} introduction={formData.introduction} icon={formData.icon} />

            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} />
        </Container>
    )
});