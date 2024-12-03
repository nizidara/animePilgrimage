import { memo, FC, useCallback, useState, useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { useNavigate } from "react-router-dom";

export const SearchAnime: FC = memo(() =>{
    const { animeList, loading, error } = useGetAnimeList();
    const [filteredAnimeList, setFilteredAnimeList] = useState(animeList);

    useEffect(() => {
        if (animeList) {
            setFilteredAnimeList(animeList);
        }
    }, [animeList]);

    const handleSearch = useCallback((title: string) => {
        if(animeList){
            setFilteredAnimeList(animeList.filter(anime => anime.title.includes(title)));
        }
    }, [animeList]);

    const navigate = useNavigate();
    const onClickDetail = useCallback((animeId: number) => navigate(`/anime?anime_id=${animeId}`), [navigate]);
    

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h1 className="mt-1">作品一覧</h1>
            <SearchAnimeForm onSearch={handleSearch} />
            <SwitchSearchLink flag={0} />
            <ListGroup>
                {filteredAnimeList.map(anime => (
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