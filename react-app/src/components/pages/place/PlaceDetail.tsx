import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";


export const PlaceDetail: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地詳細ページです．</h2>
            <DisplayMap />
            <PlaceSummaryCard />
            <PhotoCard />
            <CommentForm />
            <CommentCard />
        </Container>
    )
});