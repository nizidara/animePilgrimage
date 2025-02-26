import { memo, FC, useCallback } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { responseEditAnimeData } from "../../../type/api/anime";
import { EditAnimeDetailDisplay } from "../../organisms/display/EditAnimeDetailDisplay";
import { Icon } from "../../atoms/Icon";
import { Helmet } from "react-helmet-async";

export const EditRequestAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseEditAnimeData;
    
    const onClickAnime = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "アニメ修正リクエスト 完了",
        "description": `アニメ修正リクエストが完了しました。承認完了までお待ちください。`,
        "url": `https://pilgrimage.nizidara.com/edit_anime/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"アニメ修正リクエスト 完了"}</title>
                <meta name="description" content={`アニメ修正リクエストが完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta property="og:title" content={`アニメ修正リクエスト 完了 - にじげんたび`} />
                <meta property="og:description" content={`アニメ修正リクエストが完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">修正リクエストが完了しました</h2>
                <EditAnimeDetailDisplay 
                    title={responseData.title}
                    introduction={responseData.introduction}
                    contents={responseData.contents}
                    request_anime_id={responseData.request_anime_id}
                    request_date={responseData.request_date}
                />
                {responseData.file_name && <Icon file_name={responseData.file_name} />}

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Button variant="primary" onClick={() => onClickAnime(responseData.anime_id)}>アニメ情報に戻る</Button>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
});