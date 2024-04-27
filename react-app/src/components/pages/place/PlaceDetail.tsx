import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { DisplayMap } from "../../organisms/map/DisplayMap";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { PhotoCard } from "../../organisms/card/PhotoCard";
import { CommentForm } from "../../organisms/form/CommentForm";
import { CommentCard } from "../../organisms/card/CommentCard";
import { useNavigate } from "react-router-dom";


export const PlaceDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickEdit = useCallback(() => navigate("/edit_place"), [navigate]);
    const onClickDelete = useCallback(() => navigate("/delete_place"), [navigate]);

    return (
        <Container>
            <h2>聖地詳細ページです．</h2>
            <Button variant="secondary" size="lg" onClick={onClickEdit}>修正</Button> <Button variant="secondary" size="lg" onClick={onClickDelete}>削除</Button>
            <DisplayMap />
            <PlaceSummaryCard />
            <PhotoCard />
            <CommentForm />
            <CommentCard />
        </Container>
    )
});