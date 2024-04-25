import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { RegisterPlaceForm } from "../../organisms/form/RegisterPlaceForm";
export const AdminPlaceDetail: FC = memo(() =>{
    return (
        <Container>
            <h2>Admin聖地詳細ページです．</h2>
            <RegisterPlaceForm />
        </Container>
    )
});