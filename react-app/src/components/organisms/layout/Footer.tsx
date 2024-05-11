import { FC, memo } from "react"


export const Footer: FC = memo(() => {
    return (
        <div className="mt-auto py-2 text-center">
            <p>Copyright&copy; にじだら, {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    )
});