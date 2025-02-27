import { memo, FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { Link, useLocation } from "react-router-dom";
import { responsePlaceData } from "../../../type/api/place";
import { Helmet } from "react-helmet-async";

export const RegisterPlaceComplete: FC = memo(() =>{
    const location = useLocation();

    const responseData = location.state.responseData as responsePlaceData;
    const placeId = responseData.place_id;
    const animeId = responseData.anime_id;

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地登録 完了",
        "description": `聖地情報の登録が完了しました。`,
        "url": `https://pilgrimage.nizidara.com/register_place/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"聖地登録 完了"}</title>
                <meta name="description" content={`聖地情報の登録が完了しました。 - にじげんたび`} />
                <meta property="og:title" content={`聖地登録 完了 - にじげんたび`} />
                <meta property="og:description" content={`聖地情報の登録が完了しました。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
        
            <Container>
                <h2 className="mt-2">聖地の登録が完了しました</h2>
                <RegisterPlaceDetailDisplay 
                    name={responseData.name} 
                    anime_title={responseData.anime_title} 
                    region_name={responseData.region_name}
                    latitude={responseData.latitude}
                    longitude={responseData.longitude}
                    comment={responseData.comment} 
                    place_icon={responseData.place_icon}
                    anime_icon={responseData.anime_icon}
                    file_names={responseData.file_names}
                />

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={"/register_place"} state = {{animeId}}><Button variant="primary">続けて聖地を登録</Button></Link>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={`/place?place_id=${placeId}`}><Button variant="secondary">聖地情報</Button></Link>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={`/anime?anime_id=${animeId}`}><Button variant="secondary">アニメ情報</Button></Link>
                    </Col>
                </Row>

                
            </Container>
        </>
    )
});