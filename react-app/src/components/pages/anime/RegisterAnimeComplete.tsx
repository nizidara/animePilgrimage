import { memo, FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { Link, useLocation } from "react-router-dom";
import { responseAnimeData } from "../../../type/api/anime";
import { Icon } from "../../atoms/Icon";
import { Helmet } from "react-helmet-async";

export const RegisterAnimeComplete: FC = memo(() =>{
    const location = useLocation();

    const responseData = location.state.responseData as responseAnimeData;

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "アニメ登録 完了",
        "description": `アニメ情報の登録が完了しました。承認完了までお待ちください。`,
        "url": `https://pilgrimage.nizidara.com/register_anime/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"アニメ登録 完了"}</title>
                <meta name="description" content={`アニメ情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta property="og:title" content={`アニメ登録 完了 - にじげんたび`} />
                <meta property="og:description" content={`アニメ情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <h2 className="mt-2">申請が完了しました。</h2>
                <p>新規アニメ作品の申請が完了しました。<br />
                承認され次第、聖地情報の登録が可能になります。</p>
                
                <RegisterAnimeDetailDisplay title={responseData.title} kana={responseData.kana} introduction={responseData.introduction} />
                {responseData.file_name && <Icon file_name={responseData.file_name} />}

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={'/'}><Button variant="primary">TOPへ</Button></Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
});