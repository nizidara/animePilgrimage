import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeDetailDisplay } from "../../organisms/display/RegisterAnimeDetailDisplay";

export const EditRequestAnimeComplete: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ修正完了ページです．</h2>
            <RegisterAnimeDetailDisplay />
        </Container>
    )
});