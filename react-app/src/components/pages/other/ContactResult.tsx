import { memo, FC } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
import { responseContactData } from "../../../type/api/contact";
import { Helmet } from "react-helmet-async";

export const ContactResult: FC = memo(() =>{
    const location = useLocation();
    
    const responseData = location.state.responseData as responseContactData;

    const structData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "お問い合わせ完了",
        "description": `お問い合わせありがとうございます。`,
        "url": `https://pilgrimage.nizidara.com/contact/result`
    }

    return (
        <>
            <Helmet>
                <title>{"お問い合わせ完了"}</title>
                <meta name="description" content={`お問い合わせありがとうございます。 - にじげんたび`} />
                <meta property="og:title" content={`お問い合わせ完了 - にじげんたび`} />
                <meta property="og:description" content={`お問い合わせありがとうございます。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">お問い合わせが完了しました</h2>
                <ContactDetailDisplay 
                    contact_id={responseData.contact_id} 
                    name={responseData.name} 
                    email={responseData.email} 
                    title={responseData.title} 
                    contents={responseData.contents} 
                    contact_date={responseData.contact_date} 
                />

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={'/'}><Button variant="primary">TOPへ</Button></Link>
                    </Col>
                </Row>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Link to={'/guide'}><Button variant="secondary">利用ガイド</Button></Link>
                    </Col>
                </Row>
            </Container>
        </>
    )
});