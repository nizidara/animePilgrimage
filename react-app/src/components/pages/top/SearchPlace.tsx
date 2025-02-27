import { memo, FC, useCallback, useState } from "react";
import { Alert, Button, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";
import { SearchPlaceForm } from "../../organisms/form/SearchPlaceForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { PaginationControls } from "../../molecules/PaginationControls";
import { Helmet } from "react-helmet-async";
import { PlaceSummaryLinkCard } from "../../organisms/card/PlaceSummaryLinkCard";

export const SearchPlace: FC = memo(() =>{
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const initialName = searchParams.get("name") || "";
    const initialRegionId = searchParams.get("region_id") || "";
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageSize = 20;

    const [name, setName] = useState(initialName);
    const [regionId, setRegionId] = useState(initialRegionId);
    
    const { placeList, totalCount, loading, error } = useGetPlaceList(name, undefined, regionId, currentPage, pageSize);

    const totalPages = Math.ceil(totalCount / pageSize);

    const onClickMap = useCallback((name?:string | null, regionId?:string | null) => navigate("/place/list", {state: {name, regionId}}), [navigate]);

    const handleSearch = useCallback((searchName: string, searchRegionId: string) => {
        setName(searchName);
        setRegionId(searchRegionId);
        setSearchParams({ name: searchName || "", region_id: searchRegionId || "", page: "1" });
    }, [setSearchParams]);

    const handlePrevious = () => {
        const page = Math.max(currentPage - 1, 1);
        setSearchParams({ name, region_id: regionId, page: page.toString() });
    };
    
    const handleNext = () => {
        const page = Math.min(currentPage + 1, totalPages);
        setSearchParams({ name, region_id: regionId, page: page.toString() });
    };

    const handlePageSelect = (page: number) => {
        setSearchParams({ name, region_id: regionId, page: page.toString() });
    };

    if (error) return <Container><Alert variant="danger">{error}</Alert></Container>;

    const structData = {
        "@context": "https://schema.org",
        "@type": "SearchAction",
        "target": "https://pilgrimage.nizidara.com/search/place?name={search_name}&region_id={search_region}&page={search_page}",
        "query-input": "optional name=search_name&optional name=search_region&optional name=search_page",
        "name": "聖地検索",
        "description": "登録されている聖地一覧・検索ページ",
        "url": "https://pilgrimage.nizidara.com/search/place",
        "potentialAction": {
            "@type": "ItemList",
            "itemListElement": placeList.slice(0, pageSize).map((place, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": place.name,
                "description": place.comment,
                "image": place.place_icon,
                "url": `https://pilgrimage.nizidara.com/place?place_id=${place.place_id}`
            }))
        }
    }

    return (
        <>
            <Helmet>
                <title>{"聖地検索"}</title>
                <meta name="description" content={`聖地検索ページ - にじげんたび`} />
                <meta property="og:title" content={`聖地検索ページ - にじげんたび`} />
                <meta property="og:description" content={`聖地検索ページ - にじげんたび`} />
                <script type="application/ld+json">
                    {JSON.stringify(structData)}
                </script>
            </Helmet>
            <Container>
                <h1 className="mt-2">聖地検索</h1>
                <SearchPlaceForm initialName={name} initialRegionId={regionId} onSearch={handleSearch}  />

                <SwitchSearchLink flag={1} />

                <Row className="mb-2">
                    <Col xs={3}>
                        全{totalCount}件
                    </Col>
                    <Col xs={9} className="d-flex justify-content-end align-items-center">
                        <Button variant="primary" onClick={() => onClickMap(name, regionId)} disabled={placeList.length === 0}>一覧をMAPで表示</Button>
                    </Col>
                </Row>
                {loading ? <center><Spinner animation="border" /></center> :
                    <ListGroup>
                        {placeList.map(place => (
                            <ListGroup.Item key={place.place_id}>
                                <PlaceSummaryLinkCard 
                                    name={place.name} 
                                    title={place.anime_title} 
                                    comment={place.comment} 
                                    anime_id={place.anime_id} 
                                    place_id={place.place_id}
                                    place_icon={place.place_icon}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
                
                {totalCount > 0 && 
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPrevious={handlePrevious} onSelect={handlePageSelect} onNext={handleNext} />
                }
            </Container>
        </>
    )
});