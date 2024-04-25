import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";

export const EditRequestAnime: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ修正ページです．</h2>
            <RegisterAnimeForm />
        </Container>
    )
});