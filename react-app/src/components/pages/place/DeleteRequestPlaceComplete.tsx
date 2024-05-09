import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePlace } from "../../../type/api/place";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const deletePlace = location.state.formData as deletePlace;

    const onClickPlace = useCallback(() => navigate("/place"), [navigate]);
    const onClickTop = useCallback(() => navigate("/"), [navigate]);

    return (
        <Container>
            <h2>聖地削除完了ページです．</h2>
            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" />
            <DeletePlaceDetailDisplay contents={deletePlace.contents} />
            <Button variant="primary" size="lg" onClick={onClickPlace}>聖地情報に戻る</Button><br />
            <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});