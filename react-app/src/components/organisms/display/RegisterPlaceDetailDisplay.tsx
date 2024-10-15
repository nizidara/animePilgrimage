import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { responsePlaceData } from "../../../type/api/place";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { ImagePreview } from "../../molecules/ImagePreview";
import { PhotoCard } from "../card/PhotoCard";
import { Icon } from "../../atoms/Icon";

type registerPlaceDetailData = Omit<responsePlaceData, 'flag' | 'place_id' | 'anime_id' | 'region_id' | 'file_names'> & {
    anime_id?: number | null;
    region_id?: number | null;
    place_id?: string | null;
    flag?: number | null;
    anime_icon?: string | null;
    images?: File[] | null;
    file_names? : string[] | null;
    icon_index? : number | null;
}

export const RegisterPlaceDetailDisplay: FC<registerPlaceDetailData> = memo((props) => {
    const {name, comment, latitude, longitude, anime_title, region_name, place_id, flag, place_icon, anime_icon, images, file_names, icon_index} = props;

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
            {file_names && <PhotoCard file_names={file_names} />}
            {icon_index !== null && icon_index !== undefined && images && 
                <div>
                    <p>アイコン画像</p>
                    <ImagePreview image={images[icon_index]} />
                </div>
            }
            {place_icon && 
                <div>
                    <p>アイコン画像</p>
                    <Icon file_name={place_icon} />
                </div>
            }
        </>
    )
});