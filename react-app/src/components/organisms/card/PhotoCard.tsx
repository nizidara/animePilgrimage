import { FC, memo } from "react"
import { ListGroup } from "react-bootstrap";
import { responseAnimePhotoData, responseRealPhotoData } from "../../../type/api/photo";
import { Photo } from "../../atoms/Photo";
import '../../../thema/photo/PhotoListStyles.css';

type PhotoListData = {
    realPhotoList?: responseRealPhotoData[];
    animePhotoList?: responseAnimePhotoData[];
    file_names?: string[];
}

export const PhotoCard: FC<PhotoListData> = memo((props) => {
    const {realPhotoList, animePhotoList, file_names} = props;
    
    return (
        <>
            <div className="photo-list-container flex-grow-1">
                <ListGroup horizontal className="photo-list">
                    {realPhotoList && realPhotoList.map(photo => (
                        <ListGroup.Item key={photo.real_photo_id}>
                            <Photo file_name={photo.file_name} />
                        </ListGroup.Item>
                    ))}
                    {animePhotoList && animePhotoList.map(photo => (
                        <ListGroup.Item key={photo.anime_photo_id}>
                            <Photo file_name={photo.file_name} />
                        </ListGroup.Item>
                    ))}
                    {file_names && file_names.map((file_name, index) => (
                        <ListGroup.Item key={index}>
                            <Photo file_name={file_name} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </>
    )
});