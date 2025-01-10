import { memo, FC, useCallback, useState } from "react";
import { Alert, Container, Form, ListGroup, Spinner } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "../../molecules/PaginationControls";
import { useAdminGetPlaceList } from "../../../hooks/places/useAdminGetPlaceList";
import { useAdminGetAnimeList } from "../../../hooks/anime/useAdminGetAnimeList";
import { SearchAdminPlaceForm } from "../../organisms/form/SearchAdminPlaceForm";

export const AdminPlaceList: FC = memo(() =>{
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedAnimeId, setSelectedAnimeId] = useState<string | null>(null);
    const pageSize = 20;

    const { placeList, totalCount, loading, error } = useAdminGetPlaceList(undefined, selectedAnimeId, undefined, currentPage, pageSize);
    const { animeList, loading: animeListLoading, error: animeListError } = useAdminGetAnimeList();

    const totalPages = Math.ceil(totalCount / pageSize);

    const navigate = useNavigate();
    const onClickDetail = useCallback((placeId: string) => navigate(`/admin/place?place_id=${placeId}`), [navigate]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageSelect = (page: number) => {
        setCurrentPage(page);
    };

    const handleAnimeChange = (animeId: string | null) => {
        setSelectedAnimeId(animeId);
        setCurrentPage(1);
    };

    return (
        <Container>
            <h2>登録済聖地一覧</h2>
            {animeListError && <Alert variant="danger">アニメ一覧の取得に失敗しました。</Alert>}
            {animeListLoading ? (
                <center><Spinner animation="border" /></center>
            ) : (
                <SearchAdminPlaceForm
                    animeList={animeList}
                    selectedAnimeId={selectedAnimeId}
                    onAnimeChange={handleAnimeChange}
                />
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? <center><Spinner animation="border" /></center> :
                <ListGroup>
                    {placeList.map(place => (
                        <ListGroup.Item key={place.place_id}>
                            <PlaceSummaryCard 
                                name={place.name} 
                                title={place.anime_title} 
                                comment={place.comment} 
                                anime_id={place.anime_id} 
                                place_id={place.place_id}
                                onClickDetail={onClickDetail}
                                place_icon={place.place_icon}
                                flag={place.flag}
                            />
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }
            
            {totalCount > 0 && 
                <>
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPrevious={handlePrevious} onSelect={handlePageSelect} onNext={handleNext} />
                </>
            }
        </Container>
    )
});