import axios from "axios";
import {memo, FC, useState} from "react";
import { Container } from "react-bootstrap";

type Data = {
    Hello: string
}

export const Home: FC = memo(() =>{
    const [data, setData] = useState<Data>();
    const url = "http://127.0.0.1:8000";

    const GetData = () => {
        axios.get(url).then((res) => {
            setData(res.data);
        });
    }

    return (
        <Container>
            <h2>Homeページです．</h2>
            {data ? <div>{data.Hello}</div> : <button onClick={GetData}>FastAPI実行確認</button>}
        </Container>
    )
});