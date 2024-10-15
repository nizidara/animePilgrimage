import { ChangeEvent, FC, KeyboardEvent, memo, RefObject, useEffect, useState } from "react"
import { SearchMap } from "../map/SearchMap";
import { Button, Form, Image } from "react-bootstrap";
import { registerPlaceFormData } from "../../../type/form/place";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";
import { mapboxFlag } from "../../../properties/properties";
import { DummyMap } from "../map/DummyMap";
import { FileUploadIcon } from "../../atoms/FileUploadIcon";

type FormProps = {
    onFormChange: (data: registerPlaceFormData) => void;
    formData: registerPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<registerPlaceFormData>>;
    formRef: RefObject<HTMLFormElement>;
};

export const RegisterPlaceForm: FC<FormProps> = memo(({ onFormChange, formData, setFormData, formRef }) => {
    const { animeList } = useGetAnimeList();
    const { regionList } = useGetRegionList();

    useEffect(() => {
        // 画像が追加され、かつアイコンが未設定の場合に、最初の画像をアイコンに設定
        if (formData.images.length > 0 && formData.icon_index === null ) {
            setFormData(prevInputData => ({...prevInputData, icon_index: 0}));
        }
      }, [formData.images, formData.icon_index]);
    
    //入力フォーム更新
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };

    //選択フォーム更新
    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevInputData => ({ ...prevInputData, [name]: value }));
        onFormChange({ ...formData, [name]: value });
    };
    
    // 緯度経度更新
    const handleCoords = (latitude: number, longitude: number) => {
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                latitude: latitude,
                longitude: longitude,
            };
            onFormChange(updatedData);
            return updatedData;
        });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && formData.images.length + e.target.files.length <= 10) {
            const updatedImages = [...formData.images, ...Array.from(e.target.files)]
            setFormData(prevData => {
                const updatedData = {
                    ...prevData,
                    images: updatedImages,
                };
                onFormChange(updatedData);
                return updatedData;
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        //画像削除時，選択アイコン変更
        if (formData.icon_index === index) {
            setFormData(prevInputData => ({...prevInputData, icon_index: null}));
        } else if (formData.icon_index !== undefined && formData.icon_index !== null && formData.icon_index > index) {
            const updateIndex = formData.icon_index - 1;
            setFormData(prevInputData => ({...prevInputData, icon_index: updateIndex}));
        }

        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);
        setFormData(prevData => {
            const updatedData = {
                ...prevData,
                images: updatedImages,
            };
            onFormChange(updatedData);
            return updatedData;
        });
    };

    const handleIconSelect = (index: number) => {
        setFormData(prevInputData => ({...prevInputData, icon_index: index}));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <>
            <Form ref={formRef} onKeyDown={handleKeyDown}>
                <Form.Group className="mb-3" controlId="registerPlaceFormName">
                    <Form.Label>聖地名※</Form.Label>
                    <Form.Control required type="text" name="name" defaultValue={formData.name} maxLength={30} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.name.length} / 30 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPlaceSelectTitle">
                    <Form.Label>作品名※</Form.Label>
                    <Form.Select required className="mb-3" name="anime_id" value={formData.anime_id} onChange={selectChange}>
                        <option value="">作品名を選択してください</option>
                        {animeList.map(anime => (
                            <option key={anime.anime_id} value={anime.anime_id}>{anime.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPlaceSelectRegion">
                    <Form.Label>都道府県名※</Form.Label>
                    <Form.Select required className="mb-3" name="region_id" value={formData.region_id} onChange={selectChange}>
                        <option value="">都道府県を選択してください</option>
                        {regionList.map(region => (
                            <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {mapboxFlag ? <SearchMap onSelectCoords={handleCoords} latitude={formData.latitude} longitude={formData.longitude} /> : <DummyMap />}

                <Form.Group className="mb-3" controlId="registerPlaceFormComment">
                    <Form.Label>紹介コメント※</Form.Label>
                    <Form.Control required as="textarea" name="comment" defaultValue={formData.comment ? formData.comment : ""} maxLength={200} onChange={handleChange} />
                    <Form.Text className="text-muted">{formData.comment ? formData.comment.length : 0} / 200 </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPlaceFormImages">
                    <Form.Label>アニメ画像（最大10枚）</Form.Label><br />
                    <Form.Label>
                        <FileUploadIcon />
                    </Form.Label>
                    <Form.Control type="file" accept="image/*" multiple hidden onChange={handleImageChange} />
                </Form.Group>
                <div className="d-flex flex-wrap">
                    {formData.images.map((image, index) => (
                        <div key={index} className="position-relative m-1">
                            <div className="position-absolute top-0 start-0">
                                <Form.Check
                                    type="radio"
                                    name="iconImage"
                                    id={`iconImage-${index}`}
                                    label="アイコンに設定"
                                    checked={formData.icon_index === index}
                                    onChange={() => handleIconSelect(index)}
                                />
                            </div>
                            <div className="mt-4 position-relative">
                                <Image src={URL.createObjectURL(image)} thumbnail width={200} height={200} />
                                <Button variant="danger" size="sm" className="position-absolute top-0 end-0" onClick={() => handleRemoveImage(index)}>×</Button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {formData.icon_index !== null && (
                    <div className="mt-3">
                        <p>アイコン画像</p>
                        <Image
                            src={URL.createObjectURL(formData.images[formData.icon_index])}
                            thumbnail
                            width={200}
                            height={200}
                        />
                    </div>
                )}
            </Form>
        </>
    )
});