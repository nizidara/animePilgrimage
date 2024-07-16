import {memo, FC, useCallback} from "react";
import { Container, ListGroup } from "react-bootstrap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { useGetPlaceList } from "../../../hooks/places/useGetPlaceList";
import { useNavigate } from "react-router-dom";

export const AdminPlaceList: FC = memo(() =>{
    const { placeList, loading, error } = useGetPlaceList();

    const navigate = useNavigate();
    const onClickDetail = useCallback((placeId: string) => navigate(`/admin/place?place_id=${placeId}`), [navigate]);

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
                        />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
});