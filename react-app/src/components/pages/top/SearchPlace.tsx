import {memo, FC, useCallback} from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { SearchPlaceForm } from "../../organisms/form/SearchPlaceForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { placeList } from "../../../testdatas/testdata";
import { useNavigate } from "react-router-dom";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";

export const SearchPlace: FC = memo(() =>{

    const { placeList, loading, error } = useGetPlaceList();

    const navigate = useNavigate();

    const onClickMap = useCallback(() => navigate("/place/list"), [navigate]);
    const onClickDetail = useCallback((placeId: string) => navigate(`/place?place_id=${placeId}`), [navigate]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p>エラー: {error}</p>;

    return (
        <Container>
            <h1>聖地検索</h1>
            
            <SearchPlaceForm />

            <SwitchSearchLink flag={1} />

            <div className="d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={onClickMap}>一覧をMAPで表示</Button>
            </div>
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
                            file_name={place.file_name}
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
        
});