import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
export const AdminPlaceList: FC = memo(() =>{
    return (
        <Container>
            <h2>Admin聖地リストページです．</h2>
            <PlaceSummaryCard />
        </Container>
    )
});