import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { ContactSummaryCard } from "../../organisms/card/ContactSummaryCard";
export const AdminContactList: FC = memo(() =>{
    return (
        <Container>
            <h2>Adminお問い合わせ内容一覧ページです．</h2>
            <ContactSummaryCard />
        </Container>
    )
});