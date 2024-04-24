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
        </Container>
    )
});