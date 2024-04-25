import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";

export const RegisterAnime: FC = memo(() =>{
    return (
        <Container>
            <h2>アニメ登録ページです．</h2>
            <RegisterAnimeForm />
        </Container>
    )
});