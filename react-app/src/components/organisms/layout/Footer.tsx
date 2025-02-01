import { FC, memo } from "react"
import { Link } from "react-router-dom";

export const Footer: FC = memo(() => {
    return (
        <div className="mt-5 py-2 text-center">
            <small>
                <Link to="/terms">利用規約</Link> | <Link to="/privacy">プライバシーポリシー</Link> | <Link to="/guide">ヘルプ</Link> | <Link to="/contact">お問い合わせ</Link>
            </small>
            <p>Copyright&copy; にじだら, {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    )
});