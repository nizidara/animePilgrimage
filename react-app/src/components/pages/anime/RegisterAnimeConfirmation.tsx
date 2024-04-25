import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";

export const RegisterAnimeConfirmation: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ登録確認ページです．</h2>
            <RegisterAnimeDetailDisplay />
        </Container>
    )
});