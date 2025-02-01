import { memo, FC, useCallback, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useRegisterAnime } from "../../../hooks/anime/useRegisterAnime";
import { useRegisterAnimeContext } from "../../../providers/RegisterAnimeContext";

export const RegisterAnimeConfirmation: FC = memo(() =>{
    const navigate = useNavigate();

    const { formData } = useRegisterAnimeContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, registerError } = useRegisterAnime();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => {
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        register(formData, () => setIsSubmitting(false));
    };

    return (
        <Container>
            <h2 className="mt-2">新規アニメ登録申請 内容確認</h2>
            <p>登録する内容をご確認ください。</p>
            {registerError && <Alert variant="danger">{registerError}</Alert>}
            <RegisterAnimeDetailDisplay title={formData.title} kana={formData.kana} introduction={formData.introduction} icon={formData.icon} />
            <BackAndNextButtons backName="戻る" nextName="登録" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
        </Container>
    )
});