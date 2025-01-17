import { FC, memo } from "react"
import { DisplayMap } from "../map/DisplayMap";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { responseRequestPlaceData } from "../../../type/api/place";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { Col, Row } from "react-bootstrap";
import { PhotoListDisplay } from "./PhotoListDisplay";

type editPlaceDetailData = Omit<responseRequestPlaceData, 'place_id' | 'anime_id' | 'region_id' | 'request_date' | 'request_place_id' | 'request_type'> & {
    request_date?: string | null;
    request_type?: number | null;
    request_place_id?: number | null;
    place_id?: string | null;
    anime_id?: number | null;
    region_id?: number | null;
    anime_icon?: string | null;
    file_names: string[];
}

export const EditPlaceDetailDisplay: FC<editPlaceDetailData> = memo((props) => {
    const {name, comment, latitude, longitude, anime_title, region_name, place_id, request_type, request_place_id, request_date, user_name, user_id, contents, anime_icon, file_names} = props;

    const geojson = convertPlaceDataToGeoJson({longitude, latitude, name, comment, place_id, anime_icon})
    
    return (
        <>
            {request_place_id != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせID：</b></Col>
                    <Col xs={12} md={9}>{request_place_id}</Col>
                </Row>
            }
            {request_type != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>リクエストタイプ：</b></Col>
                    <Col xs={12} md={9}>{request_type}</Col>
                </Row>
            }
            {request_date != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせ日時：</b></Col>
                    <Col xs={12} md={9}><DateTimeFormatter datetime={request_date} /></Col>
                </Row>
            }
            {user_name != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>ユーザー名：</b></Col>
                    <Col xs={12} md={9}>{user_name}({user_id})</Col>
                </Row>
            }
            <Row className="mb-2">
                <Col xs={12} md={3}><b>聖地名：</b></Col>
                <Col xs={12} md={9}>{name}{place_id != null && <div>({place_id})</div>}</Col>
            </Row>
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
            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} /> : <DummyMap />}
            <Row className="mb-2 mt-2">
                <Col xs={12} md={3}><b>紹介コメント：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{comment}</Col>
            </Row>
            <PhotoListDisplay file_names={file_names} />
            <Row className="mb-2 mt-2">
                <Col xs={12} md={3}><b>修正理由：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{contents}</Col>
            </Row>
        </>
    )
});