import {memo, FC} from "react";
import { Container } from "react-bootstrap";

export const Home: FC = memo(() =>{
    return (
        <Container>
            <h2>Homeページです．</h2>
        </Container>
    )
});