import {memo, FC} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
export const AdminPlaceList: FC = memo(() =>{
    
    const placeList = [
        { place_id: 1, name: "すみだ水族館", comment: "さかなー ちんあなご～", title: "リコリス・リコイル" },
        { place_id: 2, name: "東京スカイツリー", comment: "バランス", title: "リコリス・リコイル" },
        { place_id: 3, name: "錦糸公園", comment: "出会いの場", title: "リコリス・リコイル" },
    ];

    return (
        <Container>
            <h2>Admin聖地リストページです．</h2>
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