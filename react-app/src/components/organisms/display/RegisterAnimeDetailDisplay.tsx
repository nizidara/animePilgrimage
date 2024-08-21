import { FC, memo } from "react"
import { registerAnimeFormData } from "../../../type/form/anime";
import { Image } from "react-bootstrap";


export const RegisterAnimeDetailDisplay: FC<registerAnimeFormData> = memo((props) => {
    const {title, kana, introduction, icon} = props;

    return (
        <>
            <div>登録アニメ詳細表示</div>
            <p>作品名:{title}</p>
            <p>作品名（カナ）：{kana}</p>
            <p>作品紹介：{introduction}</p>
            <div className="d-flex flex-wrap">
                <div className="position-relative m-1">
                    {icon && <Image src={URL.createObjectURL(icon)} thumbnail width={200} height={200} />}
                </div>
            </div>
        </>
    )
});