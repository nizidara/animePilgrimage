import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { AnimeIntroductionDisplay } from "../../organisms/display/AnimeIntroductionDisplay";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";

export const AnimeDetail: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ詳細ページです．</h2>
            <AnimeIntroductionDisplay />
            <PlaceSummaryCard />
        </Container>
    )
});