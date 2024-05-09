import {memo, FC, useCallback} from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { useNavigate } from "react-router-dom";

export const PlaceList: FC = memo(() =>{
    const navigate = useNavigate();

    const placeList = [
        { place_id: 1, name: "すみだ水族館", comment: "さかなー ちんあなご～", title: "リコリス・リコイル" },
        { place_id: 2, name: "東京スカイツリー", comment: "バランス", title: "リコリス・リコイル" },
        { place_id: 3, name: "錦糸公園", comment: "出会いの場", title: "リコリス・リコイル" },
    ];

    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);

    return (
        <Container>
            <h2>聖地一覧ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickAnime}>#anime</Button>
            <DisplayMap />
            <PlaceSummaryCard name="すみだ水族館" title="リコリコ" comment="さかな～ ちんあなご～" /><br />
            <PhotoCard title="リコリコ" name="すみだ水族館" />
            <hr />
            <Button variant="secondary" size="lg" onClick={onClickRegisterPlace}>登録</Button><br />
            <ListGroup>
                {placeList.map(place => (
                    <ListGroup.Item key={place.place_id}>
                        <PlaceSummaryCard name={place.name} title={place.title} comment={place.comment} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});