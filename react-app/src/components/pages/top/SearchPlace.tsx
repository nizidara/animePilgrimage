import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { SearchPlaceForm } from "../../organisms/form/SearchPlaceForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";

export const SearchPlace: FC = memo(() =>{
    return (
        <Container>
            <h1>聖地検索ページです．</h1>
            <SearchPlaceForm />
            <SwitchSearchLink />
            <PlaceSummaryCard />
        </Container>
    )
        
});