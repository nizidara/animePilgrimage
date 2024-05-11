import {memo, FC} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { animeList } from "../../../testdatas/testdata";

export const SearchAnime: FC = memo(() =>{

    return (
        <Container>
            <h1>アニメタイトル検索</h1>
            <SearchAnimeForm />
            <SwitchSearchLink flag={0} />
            <ListGroup>
                {animeList.map(anime => (
                    <ListGroup.Item key={anime.anime_id}>
                        <AnimeSummaryCard title={anime.title} introduction={anime.introduction} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
        
});