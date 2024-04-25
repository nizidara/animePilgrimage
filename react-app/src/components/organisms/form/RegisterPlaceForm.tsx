import { FC, memo } from "react"
import { SearchMap } from "../map/SearchMap";


export const RegisterPlaceForm: FC = memo(() => {
    
    return (
        <>
            <p>聖地登録フォームです</p>
            <SearchMap />
        </>
    )
});