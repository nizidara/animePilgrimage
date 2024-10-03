import { FC, MouseEvent, memo, useEffect, useRef, useState } from "react"
import { Button, Image, ListGroup, Modal, Overlay, Popover } from "react-bootstrap";
import { photoData } from "../../../type/api/place";
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

    const scrollRef = useRef<HTMLDivElement>(null);
    const [showArrows, setShowArrows] = useState(false);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" 
                ? scrollLeft - clientWidth 
                : scrollLeft + clientWidth;
            
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            setShowArrows(scrollWidth > clientWidth);
        }
    }, [realPhotoList, animePhotoList, file_names]);
    
    return (
        <>
            {/* {showArrows && (
                <Button 
                    variant="light" 
                    onClick={() => scroll("left")} 
                    className="arrow-button"
                >
                    ←
                </Button>
            )} */}
            <div className="photo-list-container flex-grow-1" ref={scrollRef}>
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
            {/* {showArrows && (
                <Button 
                    variant="light" 
                    onClick={() => scroll("right")} 
                    className="arrow-button"
                >
                    →
                </Button>
            )} */}
            {/* <ListGroup
                className="list_menu"
                horizontal
                style={{
                    overflowX: "scroll"
                    }}
            >
                {realPhotoList.map(photo => (
                        <ListGroup.Item key={photo.real_photo_id}>
                            <Photo file_name={photo.file_name} />
                        </ListGroup.Item>
                    ))}
            </ListGroup> */}
        </>
    )
});