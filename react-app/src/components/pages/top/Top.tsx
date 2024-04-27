import {memo, FC} from "react";
import { Container } from "react-bootstrap";
import { useFastAPITest } from "../../../hooks/useFastAPITest";

export const Top: FC = memo(() =>{
    const {GetData, data} = useFastAPITest();
    const onClickGetData = () => GetData("hello");
    return (
        <Container>
            <h2>Homeページです．</h2>
            {data ? <div>{data.message}</div> : <button onClick={onClickGetData}>FastAPI実行確認</button>}

            <hr />
            <p>ページ稼働確認リンク</p>
            <ol>
                <li><a href="/login">ログイン</a></li>
                <li><a href="/logout">ログアウト</a></li>
                <li><a href="/anime">(アニメ詳細)</a></li>
                <li><a href="/place">(聖地詳細)</a></li>
                <li><a href="/admin/top">(AdminTop)</a></li>
                <li><a href="/admin/place">(Admin聖地詳細)</a></li> 
                <li><a href="/admin/anime">(Adminアニメ詳細)</a></li> 
                <li><a href="/admin/contact">(Admin問い合わせ内容詳細)</a></li>                
            </ol>
        </Container>
    )
});