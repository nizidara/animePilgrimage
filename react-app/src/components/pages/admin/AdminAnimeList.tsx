import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
export const AdminAnimeList: FC = memo(() =>{
    return (
        <Container>
            <h2>Adminアニメリストページです．</h2>
            <AnimeSummaryCard />
        </Container>
    )
});