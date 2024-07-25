import {memo, FC, useCallback} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { useNavigate } from "react-router-dom";

export const SearchAnime: FC = memo(() =>{
    const { animeList, loading, error } = useGetAnimeList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h1>アニメタイトル検索</h1>
            <SearchAnimeForm />
            <SwitchSearchLink flag={0} />
            <ListGroup>
                {animeList.map(anime => (
                    <ListGroup.Item key={anime.anime_id}>
                        <AnimeSummaryCard 
                            anime_id={anime.anime_id} 
                            title={anime.title} 
                            kana={anime.kana}
                            flag={anime.flag}
                            introduction={anime.introduction} 
                            file_name={anime.file_name}
                            onClickDetail={onClickDetail}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
        
});