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
            <h2>削除リクエストを送信しました</h2>

            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" />
            <br />
            <DeletePlaceDetailDisplay contents={deletePlace.contents} />

            <center>
            <Button variant="primary" onClick={onClickPlace} className="mt-2">聖地情報に戻る</Button><br />
            <Button variant="primary" onClick={onClickTop} className="mt-2">TOPへ</Button>
            </center>
        </Container>
    )
});