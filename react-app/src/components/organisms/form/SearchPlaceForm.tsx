import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const SearchPlaceForm: FC = memo(() => {
    const navigate = useNavigate();

    const onClickSearch = useCallback(() => navigate("/search/place"), [navigate]);
    
    return (
        <>
            <p>聖地検索フォームです</p>
            <Button variant="secondary" size="lg" onClick={onClickSearch}>検索</Button>
        </>
    )
});