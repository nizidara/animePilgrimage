import { memo, FC, useCallback, useState, useEffect } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { SearchAnimeForm } from "../../organisms/form/SearchAnimeForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { useGetAnimeList } from "../../../hooks/anime/useGetAnimeList";
import { Helmet } from "react-helmet-async";
import { AnimeSummaryLinkCard } from "../../organisms/card/AnimeSummaryLinkCard";

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

    if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

    const structData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "アニメ検索",
        "description": "登録されているアニメ作品タイトル一覧・検索ページ",
        "url": "https://pilgrimage.nizidara.com/search/anime",
        "itemListElement": animeList.slice(0, 100).map((anime, index) => ({  // 上位100件のみ
            "@type": "ListItem",
            "position": index + 1,
            "name": anime.title,
            "description": anime.introduction,
            "image": anime.file_name,
            "url": `https://pilgrimage.nizidara.com/anime?anime_id=${anime.anime_id}`
        }))
    }

    return (
        <>
            <Helmet>
                <title>{"アニメ検索"}</title>
                <meta name="description" content={`アニメ作品一覧・タイトル検索ページ - にじげんたび`} />
                <meta property="og:title" content={`アニメ一覧・検索ページ - にじげんたび`} />
                <meta property="og:description" content={`アニメ作品一覧・タイトル検索ページ - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
        
            <Container>
                <h1 className="mt-2">作品一覧</h1>
                <SearchAnimeForm onSearch={handleSearch} />
                <SwitchSearchLink flag={0} />
                {loading ? <center><Spinner animation="border" /></center>:
                    <ListGroup>
                        {filteredAnimeList.map(anime => (
                            <ListGroup.Item key={anime.anime_id}>
                                <AnimeSummaryLinkCard 
                                    anime_id={anime.anime_id} 
                                    title={anime.title} 
                                    kana={anime.kana}
                                    flag={anime.flag}
                                    introduction={anime.introduction} 
                                    file_name={anime.file_name} />
                            </ListGroup.Item>
                        ))}
                </ListGroup>
                }
            </Container>
        </>
    )
        
});