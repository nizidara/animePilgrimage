import {memo, FC} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";

export const SearchAnime: FC = memo(() =>{
    const animeList = [
        { anime_id: 1, title: "リコリコ", introduction: "ちさたき！" },
        { anime_id: 2, title: "ユーフォ", introduction: "上手くなりたい" },
        { anime_id: 3, title: "青ブタ", introduction: "翔子さん！" },
    ];

    return (
        <Container>
            <h1>アニメ検索ページです．</h1>
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