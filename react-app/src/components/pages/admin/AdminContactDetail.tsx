import {memo, FC, useCallback} from "react";
import { Button, Container } from "react-bootstrap";
import { ContactDetailDisplay } from "../../organisms/display/ContactDetailDisplay";
import { useNavigate } from "react-router-dom";
export const AdminContactDetail: FC = memo(() =>{
    const navigate = useNavigate();
    
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    return (
        <Container>
            <h2>Adminお問い合わせ内容詳細ページです．</h2>
            {/* <ContactDetailDisplay id={111} name="hoge" email="hoge@hoge" title="hoge" contents="hogehoge" /> */}
            <Button variant="secondary" size="lg" onClick={onClickBack}>戻る</Button> <Button variant="primary" size="lg" onClick={onClickTop}>TOPへ</Button>
        </Container>
    )
});