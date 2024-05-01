import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlace } from "../../../type/api/place";

export const DeleteRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const initialFormData = location.state?.formData || { contents: ''};

    const [formData, setFormData] = useState<deletePlace>(initialFormData);

    const send = useCallback((formData:deletePlace) => navigate("/delete_place/confirmation", {state: {formData}}), [navigate]);

    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const formChange = (data:deletePlace) => {
        setFormData(data); // フォームデータを更新
    };
    
    return (
        <Container>
            <h2>聖地削除ページです．</h2>
            <PlaceSummaryCard />
            <DeleteRequestPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickNext}>次へ</Button>
        </Container>
    )
});