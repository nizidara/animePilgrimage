import React, { FC, useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";
import { Photo } from "../../atoms/Photo";
import { responseRealPhotoData } from "../../../type/api/photo";
import { useDeleteRealPhoto } from "../../../hooks/photos/useDeleteRealPhoto";

interface PhotoCardFormProps {
    photoList: responseRealPhotoData[];
    formRef: React.RefObject<HTMLFormElement>;
    onPhotoPosted: () => void;
}

export const DeleteRealPhotoForm: FC<PhotoCardFormProps> = ({ photoList, formRef, onPhotoPosted }) => {
    const { deleteRealPhotos, loading, error } = useDeleteRealPhoto();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

    const handleEditToggle = () => setIsEditing(!isEditing);

    const handleDeletePhotos = async () => {
        await deleteRealPhotos(Array.from(selectedPhotos), onPhotoPosted);
        setSelectedPhotos(new Set()); // 選択をクリア
    };

    const handleSelectPhoto = (photoId: string) => {
        setSelectedPhotos(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(photoId)) {
                newSelected.delete(photoId);
            } else {
                newSelected.add(photoId);
            }
            return newSelected;
        });
    };

    return (
        <Form ref={formRef}>
            <Button onClick={handleEditToggle}>
                {isEditing ? "完了" : "編集"}
            </Button>
            {isEditing && (
                <Button 
                    variant="danger" 
                    onClick={handleDeletePhotos} 
                    disabled={loading || selectedPhotos.size === 0}
                >
                    {loading ? "削除中..." : "選択した写真を削除"}
                </Button>
            )}
            {error && <p className="text-danger">{error}</p>}
            
            <div className="photo-list-container flex-grow-1">
                <ListGroup horizontal className="photo-list">
                    {photoList && photoList.map(photo => (
                        <ListGroup.Item key={photo.real_photo_id}>
                            {isEditing && (
                                <Form.Check 
                                    type="checkbox" 
                                    checked={selectedPhotos.has(photo.real_photo_id)} 
                                    onChange={() => handleSelectPhoto(photo.real_photo_id)} 
                                />
                            )}
                            <Photo file_name={photo.file_name} />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Form>
    );
};
