import {memo, FC, useCallback} from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const AdminTop: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickNext = useCallback(() => navigate("/admin/place/list"), [navigate]);

    return (
        <Container>
            <h2>AdminTopページです．</h2>
            <ol>
                <li><a href="/admin/contact/list">問い合わせ一覧</a></li>
                <li><a href="/admin/anime/list">アニメ一覧</a></li>
                <li><a href="/admin/place/list">聖地一覧</a></li>
                <li><a href="" onClick={onClickNext}>聖地一覧</a></li>                
            </ol>

            <p>ページ稼働確認リンク</p>
            <ol>
                <li><a href="/admin/place">(Admin聖地詳細)</a></li> 
                <li><a href="/admin/anime">(Adminアニメ詳細)</a></li> 
                <li><a href="/admin/contact">(Admin問い合わせ内容詳細)</a></li>                
            </ol>
            
        </Container>
    )
});