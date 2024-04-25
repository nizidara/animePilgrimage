import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { DeleteRequestPlaceForm } from "../../organisms/form/DeleteRequestPlaceForm";

export const DeleteRequestPlace: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地削除ページです．</h2>
            <PlaceSummaryCard />
            <DeleteRequestPlaceForm />
        </Container>
    )
});