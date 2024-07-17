import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import { responseAnimeData } from "../../../type/api/anime";

export const RegisterAnimeComplete: FC = memo(() =>{
    const navigate = useNavigate();
    const location = useLocation();

    const responseData = location.state.responseData as responseAnimeData;
    
    const onClickTop = useCallback(() => navigate("/"), [navigate]);
    return (
        <Container>
            <h2>申請が完了しました。</h2>
            <p>新規アニメ作品の申請が完了しました。<br />
            承認され次第、聖地情報の登録が可能になります。</p>
            <RegisterAnimeDetailDisplay title={responseData.title} kana={responseData.kana} introduction={responseData.introduction} />

            <div className="d-grid gap-2">
                <Button variant="primary" onClick={onClickTop}>TOP</Button>
            </div>
        </Container>
    )
});