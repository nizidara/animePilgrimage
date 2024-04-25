import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";

export const PlaceList: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地一覧ページです．</h2>
            <DisplayMap />
            <PlaceSummaryCard />
            <PhotoCard />
            <PlaceSummaryCard />
        </Container>
    )
});