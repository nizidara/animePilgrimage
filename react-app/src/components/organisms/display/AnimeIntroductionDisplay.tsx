import { FC, memo } from "react"
import { animeDetail } from "../../../type/api/anime";


export const AnimeIntroductionDisplay: FC<animeDetail> = memo((props) => {
    const {title, introduction} = props;
    
    return (
        <>
            <div>img? {title}</div>
            <p>{introduction}</p>
        </>
    )
});