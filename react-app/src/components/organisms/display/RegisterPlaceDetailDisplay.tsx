import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { responsePlaceData } from "../../../type/api/place";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";

type registerPlaceDetailData = Omit<responsePlaceData, 'flag' | 'place_id' | 'anime_id' | 'region_id'> & {
    anime_id?: number | null;
    region_id?: number | null;
    place_id?: string | null;
    flag?: number | null;
    anime_icon?: string | null;
}

export const RegisterPlaceDetailDisplay: FC<registerPlaceDetailData> = memo((props) => {
    const {name, comment, latitude, longitude, anime_title, region_name, place_id, flag, anime_icon} = props;

    const geojson = convertPlaceDataToGeoJson({longitude, latitude, name, comment, place_id, anime_icon})
    
    return (
        <>
            <p>聖地名:{name}{place_id != null && <div>({place_id})</div>}</p>
            {flag != null && <p>表示フラグ:{flag}</p>}
            <p>アニメタイトル:{anime_title}</p>
            <p>都道府県:{region_name}</p>
            <DisplayMap geojson={geojson} />({latitude}, {longitude})
            <p>紹介コメント：{comment}</p>
        </>
    )
});