import { FC, memo } from "react";
import { Image } from "react-bootstrap";
import { BsImage } from "react-icons/bs";
import '../../thema/photo/IconStyles.css';

type IconProps = {
    file_name?: string | null;
};

export const Icon: FC<IconProps> = memo((props) =>{
    const {file_name} = props

    return (    
        <>
            {file_name ? <Image src={file_name.startsWith("http") ? file_name : `${process.env.PUBLIC_URL}/${file_name}`}  rounded className="icon-image-crop" /> : <BsImage size={80} />}
        </>
    )
});