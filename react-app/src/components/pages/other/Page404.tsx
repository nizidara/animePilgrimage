import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

export const Page404: FC = memo(() =>{
    return (
        <>
            <Helmet>
                <title>{"ページが見つかりません"}</title>
                <meta name="description" content={`ページが見つかりません。指定されたURLは存在しないか、削除された可能性があります。 - にじげんたび`} />
                <meta property="og:title" content={`ページが見つかりません - にじげんたび`} />
                <meta property="og:description" content={`ページが見つかりません。指定されたURLは存在しないか、削除された可能性があります。 - にじげんたび`} />
                <meta name="robots" content="noindex, nofollow"/>
            </Helmet>
            <Container>
                <h2>404 Not Found</h2>    
            </Container>
        </>
    )
});