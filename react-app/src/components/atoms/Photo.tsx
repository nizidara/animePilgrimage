import { FC, memo, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import '../../thema/photo/CommentStyles.css';

type PhotoProps = {
    file_name?: string | null;
};

export const Photo: FC<PhotoProps> = memo((props) =>{
    const {file_name} = props
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (    
        <>
            {file_name && (
                <>
                    <Image src={file_name} rounded className="square-image-crop" onClick={handleShow} />
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton />
                        <Modal.Body>
                            <Image src={file_name} fluid />
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
});