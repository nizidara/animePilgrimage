import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceDetailDisplay } from "../../organisms/display/RegisterPlaceDetailDisplay";

export const RegisterPlaceConfirmation: FC = memo(() =>{
    return (
        <Container>
            <h2>聖地登録確認ページです．</h2>
            <RegisterPlaceDetailDisplay />
        </Container>
    )
});