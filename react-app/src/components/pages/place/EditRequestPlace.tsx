import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlace } from "./RegisterPlace";

export const EditRequestPlace: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地修正ページです．</h2>
            <RegisterPlace />
        </Container>
    )
});