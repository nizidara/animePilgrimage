import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";

export const SearchAnime: FC = memo(() =>{
    return (
        <Container>
            <h1>アニメ検索ページです．</h1>
            <SearchAnimeForm />
            <SwitchSearchLink flag={0} />
            <AnimeSummaryCard />
        </Container>
    )
        
});