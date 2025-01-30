import { memo, FC, useCallback } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useGetPlaceDetail } from "../../../hooks/places/useGetPlaceDetail";
import { useAdminApproveRequestPlace } from "../../../hooks/places/useAdminApproveRequestPlace";
import { useAdminDeclineRequestPlace } from "../../../hooks/places/useAdminDeclineRequestPlace";
import { useAdminGetRequestPlaceDetail } from "../../../hooks/places/useAdminGetRequestPlaceDetail";
import { EditPlaceDetailDisplay } from "../../organisms/display/EditPlaceDetailDisplay";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";

export const AdminRequestPlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();
    
        const [searchParams] = useSearchParams();
        const requestPlaceId = searchParams.get('request_place_id');
        const placeId = searchParams.get('place_id');
    
        const { place, loading:placeLoading, error:placeError } = useGetPlaceDetail(placeId);
        const { requestPlace, loading, error } = useAdminGetRequestPlaceDetail(requestPlaceId);
        const { approve, approveError } = useAdminApproveRequestPlace();
        const { decline, declineError } = useAdminDeclineRequestPlace();
    
        const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
        const onClickBack = useCallback(() => navigate(-1), [navigate]);
    
        const onClickApprove = (requestPlaceId: string) => {approve(requestPlaceId)};
        const onClickDecline = (requestPlaceId: string) => {decline(requestPlaceId)};
    
        
        if (error) return <Alert variant="danger">{error}</Alert>;
        if (placeError) return <Alert variant="danger">{placeError}</Alert>;
        if (!requestPlaceId) {
            return <div>No Anime found</div>;
        }
    
        return (
            <Container>
                <h2>現在の聖地情報</h2>
                {placeLoading ? <center><Spinner animation="border" /></center> :
                    place &&
                    <>
                        <RegisterPlaceDetailDisplay 
                            name={place.name} 
                            anime_title={place.anime_title} 
                            region_name={place.region_name}
                            latitude={place.latitude}
                            longitude={place.longitude}
                            comment={place.comment} 
                            place_icon={place.place_icon}
                            anime_icon={place.anime_icon}
                            file_names={place.file_names}
                        />
                    </>}
                <h2>リクエスト情報</h2>
                {loading ? <center><Spinner animation="border" /></center> :
                    requestPlace && 
                    <> 
                        <EditPlaceDetailDisplay 
                            name={requestPlace.name} 
                            anime_title={requestPlace.anime_title}
                            region_name={requestPlace.region_name}
                            latitude={requestPlace.latitude}
                            longitude={requestPlace.longitude}
                            comment={requestPlace.comment} 
                            contents={requestPlace.contents}
                            request_date={requestPlace.request_date}
                            request_place_id={requestPlace.request_place_id}
                            anime_icon={requestPlace.anime_icon}
                            file_names={[]}
                        />
                    </>
                    
                }
                {approveError && <Alert variant="danger">{approveError}</Alert>}
                {declineError && <Alert variant="danger">{declineError}</Alert>}
                
                <BackAndNextButtons backName="却下" nextName="承認" onClickBack={() => onClickDecline(requestPlaceId)} onClickNext={() => onClickApprove(requestPlaceId)} />
                <div className="d-flex justify-content-center mt-2">
                    <Button variant="primary" onClick={onClickBack}>戻る</Button>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
                </div>
            </Container>
        )
});