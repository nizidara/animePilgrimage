import { memo, FC, useCallback } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { useAdminGetAnimeList } from "../../../hooks/anime/useAdminGetAnimeList";
import { useNavigate } from "react-router-dom";

export const AdminAnimeList: FC = memo(() =>{
    const { animeList, loading, error } = useAdminGetAnimeList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((animeId: number) => navigate(`/admin/anime?anime_id=${animeId}`), [navigate]);

    return (
        <Container>
            <h2>登録済アニメ一覧</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
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
            }
            
        </Container>
    )
});