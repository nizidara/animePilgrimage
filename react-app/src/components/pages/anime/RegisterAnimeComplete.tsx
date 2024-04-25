import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";

export const RegisterAnimeComplete: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ登録完了です．</h2>
            <RegisterAnimeDetailDisplay />
        </Container>
    )
});