import { memo, FC, useCallback, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "../../molecules/PaginationControls";

export const AdminPlaceList: FC = memo(() =>{
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 20;

    const { placeList, totalCount, loading, error } = useGetPlaceList(undefined, undefined, undefined, currentPage, pageSize);

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

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h2>登録済聖地一覧</h2>
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
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
            
            {totalCount > 0 && 
                <>
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPrevious={handlePrevious} onSelect={handlePageSelect} onNext={handleNext} />
                </>
            }
        </Container>
    )
});