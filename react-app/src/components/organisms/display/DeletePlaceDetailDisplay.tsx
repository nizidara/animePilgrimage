import { FC, memo } from "react"
import { responseRequestPlaceData } from "../../../type/api/place";
import { PlaceSummaryCard } from "../card/PlaceSummaryCard";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { DisplayMap } from "../map/DisplayMap";
import { GeoJson } from "../../../type/externalAPI/mapbox";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";

type deletePlaceDetailData = Omit<responseRequestPlaceData, 'region_id' | 'region_name' | 'request_date' | 'request_place_id' | 'request_type'> & {
    request_date?: string | null;
    request_type?: number | null;
    request_place_id?: number | null;
    region_id?: number | null;
    region_name?: string | null;
    place_icon?: string | null;
    anime_icon?: string | null;
}

export const DeletePlaceDetailDisplay: FC<deletePlaceDetailData> = memo((props) => {
    const {contents, name, anime_title, comment, anime_id, place_id, request_place_id, request_date, user_id, user_name, latitude, longitude, place_icon, anime_icon} = props;

    const geojson = convertPlaceDataToGeoJson({longitude, latitude, name, comment, place_id, anime_icon})
    
    return (
        <>
            {request_place_id != null && <p>お問い合わせID:{request_place_id}</p>}
            {request_date != null && <p>お問い合わせ日時:<DateTimeFormatter datetime={request_date} /></p>}
            {user_name != null && <p>ユーザー名:{user_name}({user_id})</p>}
            <PlaceSummaryCard name={name} title={anime_title} comment={comment} anime_id={anime_id} place_id={place_id} place_icon={place_icon}/>
            <div>({latitude}, {longitude})</div>
            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} /> : <DummyMap />}
            <p>削除申請理由</p>
            <p>{contents}</p>
        </>
    )
});