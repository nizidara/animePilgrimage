import { memo, FC, useCallback, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
import { useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { registerAnimeFormData } from "../../../type/form/anime";
import { useRegisterAnimeContext } from "../../../providers/RegisterAnimeContext";
import { Helmet } from "react-helmet-async";

export const RegisterAnime: FC = memo(() =>{
    const navigate = useNavigate();

    //formData
    const { formData, setFormData } = useRegisterAnimeContext();
    const formRef = useRef<HTMLFormElement>(null);

    const formChange = (data:registerAnimeFormData) => {
        setFormData(data);
    };

    //page transition
    const send = useCallback(() => navigate("/register_anime/confirmation"), [navigate]);

    const onClickNext = () => {
        if (formRef.current) {
            formRef.current.reportValidity();
            if (formRef.current.checkValidity()) {
                send();
            }
        }
    }
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "アニメ登録",
        "description": `アニメ情報を新規登録するページです。`,
        "url": `https://pilgrimage.nizidara.com/register_anime`,
        "mainEntityOfPage": {
            "@type": "CreativeWork",
            "name": "アニメ情報登録",
            "url": "https://pilgrimage.nizidara.com/register_anime"
        }
    }

    return (
        <>
            <Helmet>
                <title>{"アニメ登録"}</title>
                <meta name="description" content={`アニメ登録ページです。 - にじげんたび`} />
                <meta property="og:title" content={`アニメ登録 - にじげんたび`} />
                <meta property="og:description" content={`アニメ登録ページです。 - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                
                <div className="d-flex justify-content-between mt-2">
                    <h2>新規アニメ登録</h2>
                    <Button variant="outline-primary" className="float-right" onClick={onClickRegisterPlace}>聖地申請はこちら</Button>
                </div>
                
                <RegisterAnimeForm onFormChange={formChange} formData={formData} setFormData={setFormData} formRef={formRef}/>
                
                <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
            </Container>
        </>
    )
});