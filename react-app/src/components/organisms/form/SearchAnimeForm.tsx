import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const SearchAnimeForm: FC = memo(() => {
    const navigate = useNavigate();

    const onClickSearch = useCallback(() => navigate("/search/anime"), [navigate]);
    
    return (
        <>
            <p>アニメ検索フォームです</p>
            <Button variant="secondary" size="lg" onClick={onClickSearch}>検索</Button>
        </>
    )
});