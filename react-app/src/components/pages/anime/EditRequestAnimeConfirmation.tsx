import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnime } from "./RegisterAnime";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";

export const EditRequestAnimeConfirmation: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ修正確認ページです．</h2>
            <RegisterAnimeDetailDisplay />
        </Container>
    )
});