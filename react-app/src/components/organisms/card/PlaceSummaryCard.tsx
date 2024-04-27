import { FC, memo, useCallback } from "react"
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const PlaceSummaryCard: FC = memo(() => {
    const navigate = useNavigate();

    const onClickAnime = useCallback(() => navigate("/anime"), [navigate]);

    return (
        <>
            <b>聖地要約カードです</b>
            <Button variant="secondary" size="lg" onClick={onClickAnime}>#anime.title</Button>
        </>
    )
});