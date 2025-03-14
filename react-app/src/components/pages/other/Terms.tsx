import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

export const Terms: FC = memo(() =>{
    const structData = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "利用規約",
        "description": `本サイトの利用規約を記載したページです。`,
        "url": `https://pilgrimage.nizidara.com/terms`
    }

    return (
        <>
            <Helmet>
                <title>{"利用規約"}</title>
                <meta name="description" content={`本サイトの利用規約を記載したページです。 - にじげんたび`} />
                <meta property="og:title" content={`利用規約 - にじげんたび`} />
                <meta property="og:description" content={`本サイトの利用規約を記載したページです。 - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>

            <Container className="mt-4">
                <h1>利用規約</h1>
                <h2>第1条（適用）</h2>
                <p>
                    本利用規約（以下、【本規約】）は、にじげんたび（以下、【本サービス】）を利用するすべてのユーザー（以下、【ユーザー】）に適用されます。ユーザーは本規約に同意した上で、本サービスを利用するものとします。
                </p>
                <h2>第2条（禁止事項）</h2>
                <ol>
                    <li>法令または公序良俗に違反する行為</li>
                    <li>他のユーザーまたは第三者の権利を侵害する行為</li>
                    <li>不正アクセス、システムへの攻撃行為</li>
                    <li>誹謗中傷や嫌がらせ行為</li>
                    <li>その他、運営者が不適切と判断する行為</li>
                </ol>
                <h2>第3条（免責事項）</h2>
                <ol>
                    <li>本サービスの提供にあたり、正確性や最新性を保証するものではありません。</li>
                    <li>ユーザー間のトラブルについて、運営者は一切の責任を負いません。</li>
                    <li>運営者は、システムのメンテナンス等の理由により、本サービスを中断・終了することができます。</li>
                    <li>投稿されたコンテンツの著作権は投稿者に帰属しますが、運営者は本サービス内での使用権を有します。</li>
                </ol>
                <h2>第4条（商標）</h2>
                <p>
                    本サービスに掲載されている商標・ロゴ・画像等の無断使用を禁止します。
                </p>
                <h2>第5条（規約の変更）</h2>
                <p>
                    運営者は、本規約を変更することができ、変更後の規約は適用開始日以降に本サービスを利用したユーザーに適用されます。
                </p>
                <p>2025年2月1日 制定</p>
            </Container>
        </>
    )
});