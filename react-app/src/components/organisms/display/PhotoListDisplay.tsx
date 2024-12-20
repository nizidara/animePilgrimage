import { FC, memo } from "react"
import { Col, Row } from "react-bootstrap";
import { responseAnimePhotoData, responseRealPhotoData } from "../../../type/api/photo";
import { Photo } from "../../atoms/Photo";
import '../../../thema/photo/PhotoListStyles.css';

type PhotoListData = {
    realPhotoList?: responseRealPhotoData[];
    animePhotoList?: responseAnimePhotoData[];
    file_names?: string[];
}

export const PhotoListDisplay: FC<PhotoListData> = memo((props) => {
    const {realPhotoList, animePhotoList, file_names} = props;
    
    return (
        <>
                <Row className="g-1">
                    {file_names && file_names.map((file_name, index) => (
                        <Col key={index} xs={6} sm={4} md={3} xl={2}>
                            <Photo file_name={file_name} />
                        </Col>
                    ))}
                    {realPhotoList && realPhotoList.map((photo, index) => (
                        <Col key={index} xs={6} sm={4} md={3} xl={2}>
                            <Photo file_name={photo.file_name} />
                        </Col>
                    ))}
                    {animePhotoList && animePhotoList.map((photo, index) => (
                        <Col key={index} xs={6} sm={4} md={3} xl={2}>
                            <Photo file_name={photo.file_name} />
                        </Col>
                    ))}
                </Row>
        </>
    )
});