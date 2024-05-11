import {memo, FC, useCallback} from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { SearchPlaceForm } from "../../organisms/form/SearchPlaceForm";
import { SwitchSearchLink } from "../../organisms/link/SwitchSearchLink";
import { PlaceSummaryCard } from "../../organisms/card/PlaceSummaryCard";
import { placeList } from "../../../testdatas/testdata";
import { useNavigate } from "react-router-dom";

export const SearchPlace: FC = memo(() =>{
    const navigate = useNavigate();

    const onClickMap = useCallback(() => navigate("/place/list"), [navigate]);

    return (
        <Container>
            <h1>聖地検索</h1>
            
            <SearchPlaceForm />

            <SwitchSearchLink flag={1} />

            <div className="d-flex justify-content-end mb-2">
                <Button variant="primary" onClick={onClickMap}>一覧をMAPで表示</Button>
            </div>
            <ListGroup>
                {placeList.map(place => (
                    <ListGroup.Item key={place.place_id}>
                        <PlaceSummaryCard name={place.name} title={place.title} comment={place.comment} />
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    )
        
});