import { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction, memo, useRef, useState } from "react"
import { Button, Overlay, Popover } from "react-bootstrap";
import { photoData } from "../../../type/api/place";


export const PhotoCard: FC<photoData> = memo((props) => {
    const {title, name} = props;
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = (event:MouseEvent<HTMLButtonElement>) => {
        setShow(!show);
        setTarget(event.target as HTMLElement);
    };
    
    return (
        <>
            <div ref={ref}>
            <Button onClick={handleClick}>写真カードです</Button>

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