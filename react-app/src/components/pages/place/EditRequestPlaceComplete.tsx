import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";

export const EditRequestPlaceComplete: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地修正完了ページです．</h2>
            <RegisterPlaceDetailDisplay />
        </Container>
    )
});