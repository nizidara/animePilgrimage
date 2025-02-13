import { memo, FC, useState, useEffect } from "react";
import { ContactForm } from "../../organisms/form/ContactForm";
import { Container } from "react-bootstrap";
import { FAQCard } from "../../organisms/card/FAQCard";

type Faq = {
    question: string;
    answer: string;
};

export const Guide: FC = memo(() =>{

    const [faq, setFaq] = useState<Faq[]>([]);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await fetch("/data/faqs.json"); // JSONファイルのパス
                const data: Faq[] = await response.json();
                setFaq(data);
            } catch (error) {
                console.error("FAQデータの読み込みに失敗しました:", error);
            }
        };

        fetchFaqs();
    }, []);
    
    return (
        <>
            <Container>
                <h2 className="mt-2">利用ガイド</h2>
                <p><a href="https://nizidara.com/pilgrimage-guide/" target="_blank" rel="noopener">こちらのページ</a>（外部ページ）に基本的な利用方法を記載しています。</p>
                <p>気軽に聖地登録やコメント投稿をよろしくお願いします！</p>
                <h2 className="mt-2">FAQ</h2>
                <FAQCard faq={faq}/>
                <br />
                <h2>お問い合わせ</h2>
                <ContactForm />
            </Container>
        </>
    )
});