import { memo, FC, useCallback, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { responsePlaceData } from "../../../type/api/place";
import { useDeleteRequestPlace } from "../../../hooks/places/useDeleteRequestPlace";
import { useDeletePlaceContext } from "../../../providers/DeletePlaceContext";

export const DeleteRequestPlaceConfirmation: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const { formData } = useDeletePlaceContext();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const place = location.state.place as responsePlaceData;

    const { deleteRequest, deleteRequestError } = useDeleteRequestPlace();

    const onClickBack = useCallback(() => navigate(-1), [navigate]);
    const onClickSend = () => {
        if (isSubmitting) return; // 連打防止
        setIsSubmitting(true);
        deleteRequest(formData, place, () => setIsSubmitting(false));
    }

    return (
        <Container>
            <h2 className="mt-2">リクエスト内容確認</h2>
            {deleteRequestError && <Alert variant="danger">{deleteRequestError}</Alert>}
            <p>削除リクエスト内容をご確認ください。</p>
            <DeletePlaceDetailDisplay 
                name={place.name}
                anime_title={place.anime_title}
                comment={place.comment}
                anime_id={place.anime_id}
                place_id={place.place_id}
                latitude={place.latitude}
                longitude={place.longitude}
                place_icon={place.place_icon}
                contents={formData.contents} 
                anime_icon={place.anime_icon}
            />
            <BackAndNextButtons backName="戻る" nextName="送信" onClickBack={onClickBack} onClickNext={onClickSend} nextDisabled={isSubmitting} />
        </Container>
    )
});