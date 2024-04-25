import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";

export const RegisterPlace: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地登録ページです．</h2>
            <RegisterPlaceForm />
        </Container>
    )
});