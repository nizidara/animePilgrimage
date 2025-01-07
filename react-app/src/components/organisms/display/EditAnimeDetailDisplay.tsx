import { FC, memo } from "react"
import { responseEditAnimeData } from "../../../type/api/anime";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { Icon } from "../../atoms/Icon";
import { ImagePreview } from "../../molecules/ImagePreview";
import { Col, Row } from "react-bootstrap";

type editDetailData = Omit<responseEditAnimeData, 'anime_id' | 'request_date' | 'request_type' | 'request_anime_id'> & {
    anime_id?: number | null;
    request_anime_id?: number | null;
    request_date?: string | null;
    request_type?: number | null;
    current_icon?: string | null;
    new_icon?: File | null;
}

export const EditAnimeDetailDisplay: FC<editDetailData> = memo((props) => {
    const {title, introduction, contents, anime_id, request_date, request_type, user_name, user_id, request_anime_id, current_icon, new_icon} = props;

    return (
        <>
            {request_anime_id != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせID：</b></Col>
                    <Col xs={12} md={9}>{request_anime_id}</Col>
                </Row>
            }
            {request_type != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>リクエストタイプ：</b></Col>
                    <Col xs={12} md={9}>{request_type}</Col>
                </Row>
            }
            {request_date != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>お問い合わせ日時：</b></Col>
                    <Col xs={12} md={9}><DateTimeFormatter datetime={request_date} /></Col>
                </Row>
            }
            {user_name != null && 
                <Row className="mb-2">
                    <Col xs={12} md={3}><b>ユーザー名：</b></Col>
                    <Col xs={12} md={9}>{user_name}({user_id})</Col>
                </Row>
            }
            <Row className="mb-2">
                <Col xs={12} md={3}><b>作品名：</b></Col>
                <Col xs={12} md={9}>{title}{anime_id != null && <div>({anime_id})</div>}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>作品紹介：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{introduction}</Col>
            </Row>
            <Row className="mb-2">
                <Col xs={12} md={3}><b>修正理由：</b></Col>
                <Col xs={12} md={9} style={{ whiteSpace: 'pre-line' }}>{contents}</Col>
            </Row>
            {current_icon && 
                    <div>
                        <p><b>現在のアイコン</b></p>
                        <Icon file_name={current_icon} />
                    </div>
            }
                    
            {new_icon && (
                <div>
                    <p className="mt-2"><b>修正用アイコン</b></p>
                    <ImagePreview image={URL.createObjectURL(new_icon)} />
                </div>
            )}
        </>
    )
});