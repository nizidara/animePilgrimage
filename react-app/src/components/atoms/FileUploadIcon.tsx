/* eslint-disable jsx-a11y/anchor-is-valid -- 見た目用のアイコン。クリックは親の label が受ける */
import { FC, memo } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsImage } from "react-icons/bs";

export const FileUploadIcon: FC = memo(() =>{

    return (    
        <>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="media-uploat-tip">画像アップロード</Tooltip>}>
                <a className="img"><BsImage /></a>
            </OverlayTrigger>
        </>
    )
});