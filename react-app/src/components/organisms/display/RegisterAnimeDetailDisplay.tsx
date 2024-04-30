import { FC, memo } from "react"
import { registerAnime } from "../../../type/api/anime";


export const RegisterAnimeDetailDisplay: FC<registerAnime> = memo((props) => {
    const {title, kana, introduction} = props;

    return (
        <>
            <div>登録アニメ詳細表示</div>
            <p>作品名:{title}</p>
            <p>カナ：{kana}</p>
            <p>紹介：{introduction}</p>
        </>
    )
});