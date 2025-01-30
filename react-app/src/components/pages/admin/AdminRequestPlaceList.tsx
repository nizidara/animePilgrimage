import { memo, FC, useCallback } from "react";
import { Alert, Container, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAdminGetRequestPlaceList } from "../../../hooks/places/useAdminGetRequestPlaceList";
import { RequestPlaceSummaryCard } from "../../organisms/card/RequestPlaceSummaryCard";

export const AdminRequestPlaceList: FC = memo(() =>{
    const { requestPlaceList, loading, error } = useAdminGetRequestPlaceList();
    
        const navigate = useNavigate();
        const onClickDetail = useCallback((requestPlaceId: number, placeId: string) => navigate(`/admin/request_place?request_place_id=${requestPlaceId}&place_id=${placeId}`), [navigate]);
        return (
            <Container>
                <h2>修正問い合わせ聖地一覧</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {loading ? <center><Spinner animation="border" /></center> :
                    <ListGroup>
                        {requestPlaceList.map(request => (
                            <ListGroup.Item key={request.request_place_id}>
                                <RequestPlaceSummaryCard
                                    request_place_id={request.request_place_id}
                                    name={request.name}      
                                    title={request.anime_title}
                                    comment={request.comment}
                                    anime_id={request.anime_id}
                                    onClickDetail={onClickDetail}
                                    place_id={request.place_id}
                                    request_type={request.request_type}
                                    request_date={request.request_date}
                                    user_id={request.user_id}
                                    user_name={request.user_name}
                                    contents={request.contents}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                }
                
            </Container>
        )
});