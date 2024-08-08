import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { responseRequestPlaceData } from "../../../type/api/place";
import { GeoJson } from "../../../type/externalAPI/mapbox";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";

type editPlaceDetailData = Omit<responseRequestPlaceData, 'place_id' | 'anime_id' | 'region_id' | 'request_date' | 'request_place_id' | 'request_type'> & {
    request_date?: string | null;
    request_type?: number | null;
    request_place_id?: number | null;
    place_id?: string | null;
    anime_id?: number | null;
    region_id?: number | null;
}

export const EditPlaceDetailDisplay: FC<editPlaceDetailData> = memo((props) => {
    const {name, comment, latitude, longitude, anime_title, region_name, place_id, request_type, request_place_id, request_date, user_name, user_id, contents} = props;

    const geojson = convertPlaceDataToGeoJson({longitude, latitude, name, comment, place_id})
    
    return (
        <>
            {request_place_id != null && <p>お問い合わせID:{request_place_id}</p>}
            {request_date != null && <p>お問い合わせ日時:<DateTimeFormatter datetime={request_date} /></p>}
            {user_name != null && <p>ユーザー名:{user_name}({user_id})</p>}
            <p>聖地名:{name}{place_id != null && <div>({place_id})</div>}</p>
            <p>アニメタイトル:{anime_title}</p>
            <p>都道府県:{region_name}</p>
            <DisplayMap geojson={geojson} />({latitude}, {longitude})
            <p>紹介コメント：{comment}</p>
            <p>修正理由：{contents}</p>
        </>
    )
});