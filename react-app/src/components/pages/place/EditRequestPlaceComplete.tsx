import { memo, FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { responseRequestPlaceData } from "../../../type/api/place";
import { Helmet } from "react-helmet-async";

export const EditRequestPlaceComplete: FC = memo(() =>{
    const location = useLocation();

    const responseData = location.state.responseData as responseRequestPlaceData;
    const animePhoto = location.state.animePhoto as string[];

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地修正リクエスト 完了",
        "description": `聖地修正リクエスト情報の登録が完了しました。承認完了までお待ちください。`,
        "url": `https://pilgrimage.nizidara.com/edit_place/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"聖地修正リクエスト 完了"}</title>
                <meta name="description" content={`聖地修正リクエスト情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta property="og:title" content={`聖地修正リクエスト 完了 - にじげんたび`} />
                <meta property="og:description" content={`聖地修正リクエスト情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
        
            <Container>
                <h2 className="mt-2">修正リクエストを送信しました</h2>

                <EditPlaceDetailDisplay 
                    name={responseData.name} 
                    anime_title={responseData.anime_title}
                    region_name={responseData.region_name}
                    latitude={responseData.latitude}
                    longitude={responseData.longitude}
                    comment={responseData.comment} 
                    contents={responseData.contents}
                    request_date={responseData.request_date}
                    request_place_id={responseData.request_place_id}
                    anime_icon={responseData.anime_icon}
                    file_names={animePhoto}
                />
                
                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={`/place?place_id=${responseData.place_id}`}><Button variant="primary">聖地情報に戻る</Button></Link>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={'/'}><Button variant="secondary">TOPへ</Button></Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
});