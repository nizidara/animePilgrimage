import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterAnimeForm } from "../../organisms/form/RegisterAnimeForm";
export const AdminAnimeDetail: FC = memo(() =>{
    return (
        <Container>
            <h2>Adminアニメ詳細ページです．</h2>
            <RegisterAnimeForm />
        </Container>
    )
});