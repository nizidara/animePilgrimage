import {memo, FC, useCallback} from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
export const AdminTop: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickNext = useCallback(() => navigate("/admin/place/list"), [navigate]);

    return (
        <Container>
            <h2>AdminTopページです．</h2>
            <ol>
                <li><Link to="/admin/contact/list">問い合わせ一覧</Link></li>
                <li><Link to="/admin/anime/list">アニメ一覧</Link></li>
                <li><Link to="/admin/place/list">聖地一覧</Link></li>           
            </ol>
        </Container>
    )
});