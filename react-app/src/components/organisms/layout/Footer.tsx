import { FC, memo } from "react"


export const Footer: FC = memo(() => {

    return (
        <div className="mt-aoto py-2 text-center fixed-bottom">
            <p>Copyright&copy; にじだら, {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
    )
});