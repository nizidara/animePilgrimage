import { FC, memo } from "react";
import { Button, Image } from "react-bootstrap";

type ImagePreviewProps = {
    image:File;
    handleRemoveIcon?: () => void;
};

export const ImagePreview: FC<ImagePreviewProps> = memo((props) =>{

    const {image, handleRemoveIcon} = props;
    return (    
        <>
            <div className="d-flex flex-wrap">
                <div className="position-relative m-1">
                    <Image src={URL.createObjectURL(image)} thumbnail width={200} height={200} />
                    {handleRemoveIcon && <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={handleRemoveIcon}>×</Button>}          
                </div>
            </div>
        </>
    )
});