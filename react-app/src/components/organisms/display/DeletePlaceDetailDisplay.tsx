import { FC, memo } from "react"
import { deletePlace } from "../../../type/api/place";


export const DeletePlaceDetailDisplay: FC<deletePlace> = memo((props) => {
    const {contents} = props;
    
    return (
        <>
            <p>削除申請理由</p>
            <p>{contents}</p>
        </>
    )
});