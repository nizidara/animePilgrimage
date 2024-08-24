import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { responsePlaceData } from "../../../type/api/place";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { ImagePreview } from "../../molecules/ImagePreview";

//要修正？(images対応)
type registerPlaceDetailData = Omit<responsePlaceData, 'flag' | 'place_id' | 'anime_id' | 'region_id' | 'images'> & {
    anime_id?: number | null;
    region_id?: number | null;
    place_id?: string | null;
    flag?: number | null;
    anime_icon?: string | null;
    images?: File[] | null;
}

export const RegisterPlaceDetailDisplay: FC<registerPlaceDetailData> = memo((props) => {
    const {name, comment, latitude, longitude, anime_title, region_name, place_id, flag, anime_icon, images} = props;

    const geojson = convertPlaceDataToGeoJson({longitude, latitude, name, comment, place_id, anime_icon})
    
    return (
        <>
            <p>聖地名:{name}{place_id != null && <div>({place_id})</div>}</p>
            {flag != null && <p>表示フラグ:{flag}</p>}
            <p>アニメタイトル:{anime_title}</p>
            <p>都道府県:{region_name}</p>
            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} /> : <DummyMap />}({latitude}, {longitude})
            <p>紹介コメント：{comment}</p>
            <div className="d-flex flex-wrap">
                {images && images.map((image, index) => <ImagePreview key={index} image={image} />)}
            </div>
        </>
    )
});