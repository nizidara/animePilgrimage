import {memo, FC} from "react";
import { Container } from "react-bootstrap";

export const Logout: FC = memo(() =>{
    return (
        <Container>
            <h2>ログアウトページです．</h2>
        </Container>
    )
});