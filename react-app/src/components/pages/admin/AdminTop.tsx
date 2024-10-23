import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export const AdminTop: FC = memo(() =>{
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