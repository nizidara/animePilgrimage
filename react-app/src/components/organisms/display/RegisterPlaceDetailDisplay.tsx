import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";


export const RegisterPlaceDetailDisplay: FC = memo(() => {
    
    return (
        <>
            <div>登録聖地詳細表示</div>
            <DisplayMap />
        </>
    )
});