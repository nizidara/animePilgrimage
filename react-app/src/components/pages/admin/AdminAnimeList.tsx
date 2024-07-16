import {memo, FC, useCallback} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { useNavigate } from "react-router-dom";
export const AdminAnimeList: FC = memo(() =>{
    const { animeList, loading, error } = useGetAnimeList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((animeId: number) => navigate(`/admin/anime?anime_id=${animeId}`), [navigate]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h2>登録済アニメ一覧</h2>
            <ListGroup>
                {animeList.map(anime => (
                    <ListGroup.Item key={anime.anime_id}>
                        <AnimeSummaryCard 
                            anime_id={anime.anime_id} 
                            title={anime.title} 
                            kana={anime.kana}
                            flag={anime.flag}
                            introduction={anime.introduction} 
                            onClickDetail={onClickDetail}/>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});