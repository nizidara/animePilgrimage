import { FC, MouseEvent, memo, useRef, useState } from "react"
import { Image, Overlay, Popover } from "react-bootstrap";
import { photoData } from "../../../type/api/place";


export const PhotoCard: FC<photoData> = memo((props) => {
    const {title, name, src} = props;
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = (event:MouseEvent<HTMLImageElement>) => {
        setShow(!show);
        setTarget(event.target as HTMLElement);
    };
    
    return (
        <>
            <div ref={ref}>
            <Image src={src} rounded onClick={handleClick}/>

            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                <Popover.Header as="h3">{title}</Popover.Header>
                <Popover.Body>
                    <strong>{name}</strong>
                </Popover.Body>
                </Popover>
            </Overlay>
            </div>
        </>
    )
});