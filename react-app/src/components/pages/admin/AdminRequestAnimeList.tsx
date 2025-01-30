import { memo, FC, useCallback } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAdminGetRequestAnimeList } from "../../../hooks/anime/useAdminGetRequestAnimeList";
import { EditAnimeSummaryCard } from "../../organisms/card/EditAnimeSummaryCard";

export const AdminRequestAnimeList: FC = memo(() =>{
    const { requestAnimeList, loading, error } = useAdminGetRequestAnimeList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((requestAnimeId: number, animeId: number) => navigate(`/admin/request_anime?request_anime_id=${requestAnimeId}&anime_id=${animeId}`), [navigate]);

    return (
        <Container>
            <h2>修正問い合わせアニメ一覧</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
                <ListGroup>
                    {requestAnimeList.map(anime => (
                        <ListGroup.Item key={anime.request_anime_id}>
                            <EditAnimeSummaryCard  
                                request_anime_id={anime.request_anime_id} 
                                anime_id={anime.anime_id}
                                request_date={anime.request_date}
                                user_id={anime.user_id}
                                user_name={anime.user_name}
                                contents={anime.contents}
                                onClickDetail={onClickDetail}
                                title={anime.title} 
                                introduction={anime.introduction} 
                                file_name={anime.file_name}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
            
        </Container>
    )
});