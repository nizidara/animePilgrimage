import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { LoginForm } from "../../organisms/form/LoginForm";

export const Login: FC = memo(() =>{
    return (
        <Container>
            <h2>ログインページです．</h2>
            <LoginForm />
        </Container>
    )
});