import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Privacy: FC = memo(() =>{
    const structData = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "プライバシーポリシー",
        "description": `本サイトのプライバシーポリシーを記載したページです。`,
        "url": `https://pilgrimage.nizidara.com/privacy`
    }

    return (
        <>
            <Helmet>
                <title>{"プライバシーポリシー"}</title>
                <meta name="description" content={`本サイトのプライバシーポリシーを記載したページです。 - にじげんたび`} />
                <meta property="og:title" content={`プライバシーポリシー - にじげんたび`} />
                <meta property="og:description" content={`本サイトのプライバシーポリシーを記載したページです。 - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
        
            <Container className="mt-4">
                <h1>プライバシーポリシー</h1>
                <h2>1. 収集する情報</h2>
                <p>本サービスでは、以下の情報を収集する場合があります。</p>
                <ul>
                    <li>ユーザーが登録する情報（メールアドレス、ユーザー名など）</li>
                    <li>投稿内容（写真、コメントなど）</li>
                    <li>アクセスログ、Cookie情報</li>
                </ul>
                <h2>2. 利用目的</h2>
                <p>収集した情報は、以下の目的で利用します。</p>
                <ul>
                    <li>サービスの提供、運営</li>
                    <li>ユーザーサポート</li>
                    <li>不正行為の防止</li>
                    <li>利用状況の分析によるサービス改善</li>
                </ul>
                <h2>3. 第三者提供</h2>
                <p>
                    ユーザーの同意がない限り、第三者へ個人情報を提供することはありません。ただし、法令に基づく場合はこの限りではありません。
                </p>
                <h2>4. セキュリティ対策</h2>
                <p>
                    運営者は、個人情報を適切に管理し、不正アクセス・情報漏洩の防止に努めます。
                </p>
                <h2>5. お問い合わせ</h2>
                <p>
                    本プライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします。<br />
                    <Link to="/contact">お問い合わせフォーム</Link>またはメールアドレス（contact@nizidara.com）
                </p>
                <h2>6. 規約の変更</h2>
                <p>
                    運営者は、本プライバシーポリシーを変更することができ、変更後のプライバシーポリシーは適用開始日以降に本サービスを利用したユーザーに適用されます。
                </p>
                <p>2025年2月1日 制定</p>
            </Container>
        </>
    )
});