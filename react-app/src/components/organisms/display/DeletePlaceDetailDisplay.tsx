import { FC, memo } from "react"
import { responseRequestPlaceData } from "../../../type/api/place";
import { PlaceSummaryCard } from "../card/PlaceSummaryCard";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { DisplayMap } from "../map/DisplayMap";
import { convertPlaceDataToGeoJson } from "../../../utilities/mapbox/convertPlaceDataToGeoJson";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { Col, Row } from "react-bootstrap";

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
            {request_place_id != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせID：</b></Col>
                    <Col xs={12} md={9}>{request_place_id}</Col>
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
            <PlaceSummaryCard name={name} title={anime_title} comment={comment} anime_id={anime_id} place_id={place_id} place_icon={place_icon}/>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>MAP</b></Col>
                <Col xs={12} md={9}><small className="text-muted">({latitude}, {longitude})</small></Col>
            </Row>
            {mapboxFlag ? <DisplayMap geojson={geojson} coodinates={geojson.features.at(0)?.geometry.coordinates as [number, number]} defaultZoom={15} /> : <DummyMap />}
            <Row className="mb-2 mt-2">
                <Col xs={12} md={3}><b>削除申請理由：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{contents}</Col>
            </Row>
        </>
    )
});