import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeletePlaceDetailDisplay } from "../../organisms/display/DeletePlaceDetailDisplay";

export const DeleteRequestPlaceComplete: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地削除完了ページです．</h2>
            <PlaceSummaryCard />
            <DeletePlaceDetailDisplay />
        </Container>
    )
});