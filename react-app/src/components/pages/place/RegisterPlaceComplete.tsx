import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responsePlaceData } from "../../../type/api/place";

export const RegisterPlaceComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responsePlaceData;
    const placeId = responseData.place_id;
    const animeId = responseData.anime_id;

    const onClickRegisterPlace = useCallback(() => navigate("/register_place", {state: {animeId}}), [navigate]);
    const onClickPlace = useCallback(() => navigate(`/place?place_id=${placeId}`), [navigate]);
    const onClickAnime = useCallback(() => navigate(`/anime?anime_id=${animeId}`), [navigate]);

    return (
        <Container>
            <h2>聖地の登録が完了しました</h2>
            <RegisterPlaceDetailDisplay 
                name={responseData.name} 
                anime_title={responseData.anime_title} 
                region_name={responseData.region_name}
                latitude={responseData.latitude}
                longitude={responseData.longitude}
                comment={responseData.comment} 
                place_icon={responseData.place_icon}
                anime_icon={responseData.anime_icon}
                file_names={responseData.file_names}
            />

            <center>
                <Button variant="primary" onClick={onClickRegisterPlace} className="mt-2">続けて聖地を登録</Button><br />
                <Button variant="primary" onClick={onClickAnime} className="mt-2">アニメ情報</Button><br />
                <Button variant="primary" onClick={onClickPlace} className="mt-2">聖地情報</Button>
            </center>
            
        </Container>
    )
});