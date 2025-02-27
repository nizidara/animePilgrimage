import { memo, FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { Link, useLocation } from "react-router-dom";
import { responseRequestPlaceData } from "../../../type/api/place";
import { Helmet } from "react-helmet-async";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    const location = useLocation();

    const responseData = location.state.responseData as responseRequestPlaceData;
    const placeIcon = location.state.placeIcon as string;
    const placeId = responseData.place_id;

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "聖地削除リクエスト 完了",
        "description": `聖地削除リクエスト情報の登録が完了しました。承認完了までお待ちください。`,
        "url": `https://pilgrimage.nizidara.com/delete_place/complete`
    }

    return (
        <>
            <Helmet>
                <title>{"聖地削除リクエスト 完了"}</title>
                <meta name="description" content={`聖地削除リクエスト情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta property="og:title" content={`聖地削除リクエスト 完了 - にじげんたび`} />
                <meta property="og:description" content={`聖地削除リクエスト情報の登録が完了しました。承認完了までお待ちください。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">削除リクエストを送信しました</h2>

                <DeletePlaceDetailDisplay 
                    name={responseData.name}
                    anime_title={responseData.anime_title}
                    comment={responseData.comment}
                    anime_id={responseData.anime_id}
                    place_id={responseData.place_id}
                    latitude={responseData.latitude}
                    longitude={responseData.longitude}
                    place_icon={placeIcon}
                    contents={responseData.contents} 
                    request_place_id={responseData.request_place_id}
                    request_date={responseData.request_date}
                    anime_icon={responseData.anime_icon}
                />

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={`/place?place_id=${placeId}`}><Button variant="primary">聖地情報に戻る</Button></Link>
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