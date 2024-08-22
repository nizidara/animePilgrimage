import { FC, memo } from "react";
import { Image } from "react-bootstrap";
import { BsXCircle } from "react-icons/bs";

type ImagePreviewProps = {
    image:File;
    handleRemoveIcon: () => void;
};

export const ImagePreview: FC<ImagePreviewProps> = memo((props) =>{

    const {image, handleRemoveIcon} = props;

    return (    
        <>
            <div className="d-flex flex-wrap">
                <div className="position-relative m-1">
                    <Image src={URL.createObjectURL(image)} thumbnail width={200} height={200} />
                    <BsXCircle
                        className="position-absolute top-0 start-100 translate-middle"
                        size={24}
                        onClick={handleRemoveIcon}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </div>
        </>
    )
});