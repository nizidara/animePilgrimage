import {memo, FC} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
export const AdminAnimeList: FC = memo(() =>{
    const animeList = [
        { anime_id: 1, title: "リコリコ", introduction: "ちさたき！" },
        { anime_id: 2, title: "ユーフォ", introduction: "上手くなりたい" },
        { anime_id: 3, title: "青ブタ", introduction: "翔子さん！" },
    ];

    return (
        <Container>
            <h2>Adminアニメリストページです．</h2>
            <ListGroup>
                {animeList.map(anime => (
                    <ListGroup.Item key={anime.anime_id}>
                        {/* <AnimeSummaryCard title={anime.title} introduction={anime.introduction} /> */}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});