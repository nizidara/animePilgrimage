import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
export const AdminContactDetail: FC = memo(() =>{
    return (
        <Container>
            <h2>Adminお問い合わせ内容詳細ページです．</h2>
            <ContactDetailDisplay />
        </Container>
    )
});