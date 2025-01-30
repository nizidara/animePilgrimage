import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdminTop: FC = memo(() =>{
    return (
        <Container>
            <h2>AdminTopページ</h2>
            <ol>
                <li><Link to="/admin/contact/list">問い合わせ一覧</Link></li>
                <li><Link to="/admin/anime/list">アニメ一覧</Link></li>
                <li><Link to="/admin/place/list">聖地一覧</Link></li>
                <li><Link to="/admin/request_anime/list">修正アニメ一覧</Link></li>
                <li><Link to="/admin/request_place/list">修正・削除聖地一覧</Link></li>
                <li><Link to="/admin/report_comment/list">通報コメント一覧</Link></li>      
            </ol>
        </Container>
    )
});