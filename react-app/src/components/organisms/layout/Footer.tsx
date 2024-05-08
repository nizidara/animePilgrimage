import { FC, memo, useEffect, useState } from "react"


export const Footer: FC = memo(() => {

    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScroll(window.innerHeight < document.body.offsetHeight);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 初期設定

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`mt-auto py-2 text-center ${hasScroll ? '' : 'fixed-bottom'}`}>
            <p>Copyright&copy; にじだら, {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    )
});