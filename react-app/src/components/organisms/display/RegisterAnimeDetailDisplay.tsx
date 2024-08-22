import { FC, memo } from "react"
import { registerAnimeFormData } from "../../../type/form/anime";
import { ImagePreview } from "../../molecules/ImagePreview";


export const RegisterAnimeDetailDisplay: FC<registerAnimeFormData> = memo((props) => {
    const {title, kana, introduction, icon} = props;

    return (
        <>
            <div>登録アニメ詳細表示</div>
            <p>作品名:{title}</p>
            <p>作品名（カナ）：{kana}</p>
            <p>作品紹介：{introduction}</p>
            {icon && <ImagePreview image={icon} />}
        </>
    )
});