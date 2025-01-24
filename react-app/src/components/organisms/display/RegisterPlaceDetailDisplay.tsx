import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { responsePlaceData } from "../../../type/api/place";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { ImagePreview } from "../../molecules/ImagePreview";
import { Icon } from "../../atoms/Icon";
import { Col, Row } from "react-bootstrap";
import { PhotoListDisplay } from "./PhotoListDisplay";

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
            <Row className="mb-2">
                <Col xs={12} md={3}><b>聖地名：</b></Col>
                <Col xs={12} md={9}>{name}{place_id != null && <div>({place_id})</div>}</Col>
            </Row>
            {flag != null && <p>表示フラグ:{flag}</p>}
            <Row className="mb-2">
                <Col xs={12} md={3}><b>アニメタイトル：</b></Col>
                <Col xs={12} md={9}>{anime_title}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>都道府県：</b></Col>
                <Col xs={12} md={9}>{region_name}</Col>
            </Row>
            
            <Row className="mb-2">
                <Col xs={12} md={3}><b>MAP</b></Col>
                <Col xs={12} md={9}><small className="text-muted">({latitude}, {longitude})</small></Col>
            </Row>
            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} defaultZoom={15} /> : <DummyMap />}
            
            <Row className="mb-2 mt-2">
                <Col xs={12} md={3}><b>紹介コメント：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{comment}</Col>
            </Row>
            {
                images && images?.length !== 0 && 
                <>
                    <p><b>アニメ画像</b></p>
                    <div className="d-flex flex-wrap">
                        {images.map((image, index) => <ImagePreview key={index} image={URL.createObjectURL(image)} />)}
                    </div>
                </>
            }
            {
                file_names && file_names?.length !== 0 &&
                <>
                    <p><b>アニメ画像</b></p>
                    <PhotoListDisplay file_names={file_names} />
                </>}
            {icon_index !== null && icon_index !== undefined && images && 
                <div className="mt-2">
                    <p><b>アイコン画像</b></p>
                    <ImagePreview image={URL.createObjectURL(images[icon_index])} />
                </div>
            }
            {place_icon && 
                <div className="mt-2">
                    <p><b>アイコン画像</b></p>
                    <Icon file_name={place_icon} />
                </div>
            }
        </>
    )
});