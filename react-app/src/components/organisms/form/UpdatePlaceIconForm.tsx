import { FC, KeyboardEvent, memo, RefObject, useState } from "react"
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { responseAnimePhotoData, responsePlaceIconData } from "../../../type/api/photo";
import { Icon } from "../../atoms/Icon";
import { useUpdatePlaceIcon } from "../../../hooks/photos/useUpdatePlaceIcon";
import { BsInfoCircle } from "react-icons/bs";

type FormProps = {
    animePhotoList?: responseAnimePhotoData[];
    placeIcon?: responsePlaceIconData;
    formRef: RefObject<HTMLFormElement>;
    onPlaceIconUpdated: () => void;
    isAdmin: boolean;
};

export const UpdatePlaceIconForm: FC<FormProps> = memo(({animePhotoList, placeIcon, formRef, onPlaceIconUpdated, isAdmin}) => {
    const { update, updateError } = useUpdatePlaceIcon(isAdmin);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [iconIndex, setIconIndex] = useState<number | null>(null);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleIconSelect = (index: number) => {
        setIconIndex(index);
    };

    const onClickUpdate = () => {
        animePhotoList && iconIndex !== null && update(animePhotoList[iconIndex].anime_photo_id, onPlaceIconUpdated, animePhotoList[iconIndex].place_id);
        setIconIndex(null);
    };
    
    return (
        <>
            {placeIcon && 
                <div>
                    <p>現在のアイコン</p>
                    {placeIcon.file_name === "" && 
                    <p><small className="text-muted"><BsInfoCircle /> アイコン画像未設定の場合は、「アイコンを変更する」ボタンから選択してください。<br />
                    「アイコンを変更する」ボタンが非表示の場合は，アニメ画像を追加するから画像を追加後に「アイコンを変更する」から選択してください。</small></p>}
                    <Icon file_name={placeIcon.file_name} />
                </div>
            }
            {animePhotoList && animePhotoList.length !== 0 && 
                <Button variant="outline-success" size="sm" className="mt-1" onClick={handleEditClick}>{isEditing? '非表示' : 'アイコンを変更する'}</Button>
            }
            {isEditing && (
                <Form ref={formRef} onKeyDown={handleKeyDown}>
                    <Form.Label>アイコンに設定する画像を選択してください</Form.Label>
                    {updateError && <Alert variant="danger">{updateError}</Alert>}
                    {animePhotoList && 
                        <div>
                            <div className="d-flex flex-wrap">
                                {animePhotoList.map((photo, index) => (
                                    <div key={index} className="position-relative m-1">
                                        
                                            <Form.Check
                                                    type="radio"
                                                    name="iconImage"
                                                    id={`iconImage-${index}`}
                                                    label="アイコンに設定"
                                                    checked={iconIndex === index}
                                                    onChange={() => handleIconSelect(index)}
                                            />
                                            <div className="mt-3 position-relative">
                                                <Icon file_name={photo.file_name} />
                                            </div>
                                        </div>
                                ))}
                            </div>
                            <Row className="mb-5 mt-3">
                                <Col>
                                    {iconIndex !== null && 
                                        <div>
                                            <p>選択された画像</p>
                                            <Icon file_name={animePhotoList[iconIndex].file_name} />
                                        </div>}
                                </Col>
                                <Col xs="auto" className="d-flex justify-content-end align-items-end">
                                    <Button variant="primary" disabled={iconIndex === null || placeIcon?.file_name === animePhotoList[iconIndex].file_name} onClick={onClickUpdate}>更新</Button>
                                </Col>
                            </Row>
                        </div>
                    }
                </Form>
            )}
        </>
    )
});