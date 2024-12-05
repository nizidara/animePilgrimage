import { memo, FC, useCallback, useState } from "react";
import { Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { SearchPlaceForm } from "../../organisms/form/SearchPlaceForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useNavigate } from "react-router-dom";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { PaginationControls } from "../../molecules/PaginationControls";

export const SearchPlace: FC = memo(() =>{
    const [name, setName] = useState<string>();
    const [regionId, setRegionId] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 20;
    
    const { placeList, totalCount, loading, error } = useGetPlaceList(name, undefined, regionId, currentPage, pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    const navigate = useNavigate();

    const onClickMap = useCallback((name?:string | null, regionId?:string | null) => navigate("/place/list", {state: {name, regionId}}), [navigate]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    const handleSearch = useCallback((searchName: string, searchRegionId: string) => {
        setName(searchName);
        setRegionId(searchRegionId);
    }, []);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    
    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    if (loading) return <Container><center><Spinner animation="border" /></center></Container>;
    if (error) return <Container><p>エラー: {error}</p></Container>;

    return (
        <Container>
            <h1 className="mt-2">聖地検索</h1>
            <SearchPlaceForm onSearch={handleSearch} />

            <SwitchSearchLink flag={1} />

            <Row className="mb-2">
                <Col xs={3}>
                    全{totalCount}件
                </Col>
                <Col xs={9} className="d-flex justify-content-end align-items-center">
                    <Button variant="primary" onClick={() => onClickMap(name, regionId)} disabled={placeList.length === 0}>一覧をMAPで表示</Button>
                </Col>
            </Row>
            <ListGroup>
                {placeList.map(place => (
                    <ListGroup.Item key={place.place_id}>
                        <PlaceSummaryCard 
                            name={place.name} 
                            title={place.anime_title} 
                            comment={place.comment} 
                            anime_id={place.anime_id} 
                            onClickDetail={onClickDetail} 
                            place_id={place.place_id}
                            place_icon={place.place_icon}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>

            <PaginationControls currentPage={currentPage} totalPages={totalPages} onPrevious={handlePrevious} onNext={handleNext} />
        </Container>
    )
        
});