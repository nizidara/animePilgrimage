import { memo, FC } from "react";
import { Container } from "react-bootstrap";
import { useFastAPITest } from "../../../hooks/useFastAPITest";
import { Link } from "react-router-dom";

export const Top: FC = memo(() =>{
    const {GetData, data} = useFastAPITest();
    const onClickGetData = () => GetData("hello");
    return (
        <Container>
            <h2>Homeページです</h2>
            {data ? <div>{data.message}</div> : <button onClick={onClickGetData}>FastAPI実行確認</button>}

            <hr />
            <p>ページ稼働確認リンク</p>
            <ol>
                <li><Link to="/login">ログイン</Link></li>
                <li><Link to="/logout">ログアウト</Link></li>
                <li><Link to="/admin/top">(AdminTop)</Link></li>                
            </ol>
        </Container>
    )
});