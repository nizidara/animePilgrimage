import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { registerPlace } from "../../../type/api/place";


export const RegisterPlaceDetailDisplay: FC<registerPlace> = memo((props) => {
    const {name, animeId, regionId, comment} = props;
    
    return (
        <>
            <div>登録聖地詳細表示</div>
            <p>聖地名:{name}</p>
            <p>アニメタイトルID:{animeId}</p>
            <p>都道府県ID:{regionId}</p>
            <DisplayMap />
            <p>紹介コメント：{comment}</p>
        </>
    )
});