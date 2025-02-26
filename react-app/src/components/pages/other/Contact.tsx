import { memo, FC } from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

export const Contact: FC = memo(() =>{
    const structData = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "お問い合わせ",
        "description": `サイトのお問い合わせページです。`,
        "url": `https://pilgrimage.nizidara.com/contact`
    }

    return (
        <>
            <Helmet>
                <title>{"お問い合わせ"}</title>
                <meta name="description" content={`サイトのお問い合わせページです。 - にじげんたび`} />
                <meta property="og:title" content={`お問い合わせ - にじげんたび`} />
                <meta property="og:description" content={`サイトのお問い合わせページです。 - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container>
                <h2 className="mt-2">お問い合わせ</h2>
                <ContactForm />
            </Container>
        </>
    )
});