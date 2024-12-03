import { FC, memo } from "react"
import { registerAnimeFormData } from "../../../type/form/anime";
import { ImagePreview } from "../../molecules/ImagePreview";
import { Col, Row } from "react-bootstrap";

export const RegisterAnimeDetailDisplay: FC<registerAnimeFormData> = memo((props) => {
    const {title, kana, introduction, icon} = props;

    return (
        <>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>作品名：</b></Col>
                <Col xs={12} md={9}>{title}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>作品名（カナ）：</b></Col>
                <Col xs={12} md={9}>{kana}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>作品紹介：</b></Col>
                <Col xs={12} md={9}>{introduction}</Col>
            </Row>
            {icon && 
                <>
                    <p><b>アイコン画像</b></p>
                    <ImagePreview image={icon} />
                </>
            }
        </>
    )
});