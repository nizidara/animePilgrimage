import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const SwitchSearchLink: FC = memo(() => {

    const navigate = useNavigate();

    const onClickSearchAnime = useCallback(() => navigate("/search/anime"), [navigate]);
    const onClickSearchPlace = useCallback(() => navigate("/search/place"), [navigate]);
    
    return (
        <>
            <hr />
            <p>##検索条件切替##</p>
            <Button variant="primary" size="lg" onClick={onClickSearchAnime}>アニメ検索</Button> <Button variant="primary" size="lg" onClick={onClickSearchPlace}>聖地検索</Button>
            <hr />
        </>
    )
});