import {memo, FC, useCallback, useState} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlace } from "../../../type/api/place";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";

export const DeleteRequestPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    //formData
    const initialFormData = location.state?.formData || { contents: ''};
    const [formData, setFormData] = useState<deletePlace>(initialFormData);

    const formChange = (data:deletePlace) => {
        setFormData(data); // フォームデータを更新
    };

    //page transition
    const send = useCallback((formData:deletePlace) => navigate("/delete_place/confirmation", {state: {formData}}), [navigate]);

    const onClickNext = () => send(formData);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>聖地削除リクエスト</h2>
            <p>削除理由を記載してください。</p>

            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" />
            <br />
            <DeleteRequestPlaceForm onFormChange={formChange} formData={formData} setFormData={setFormData} />

            <BackAndNextButtons backName="戻る" nextName="次へ" onClickBack={onClickBack} onClickNext={onClickNext} />
        </Container>
    )
});