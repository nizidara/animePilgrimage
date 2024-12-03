import { memo, FC, useCallback } from "react";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
// import { useFastAPITest } from "../../../hooks/useFastAPITest";
import { Link, useNavigate } from "react-router-dom";

export const Top: FC = memo(() =>{
    // const {GetData, data} = useFastAPITest();
    // const onClickGetData = () => GetData("hello");

    const navigate = useNavigate();

    const onClickSearchAnime = useCallback(() => navigate("/search/anime"), [navigate]);
    const onClickSearchPlace = useCallback(() => navigate("/search/place"), [navigate]);
    const onClickRegisterAnime = useCallback(() => navigate("/register_anime"), [navigate]);
    const onClickRegisterPlace = useCallback(() => navigate("/register_place"), [navigate]);

    return (
        <Container>
            <h2 className="mt-2">見てきた世界を、旅しよう。</h2>
            <p>にじげんたびは、アニメで見てきた世界・キャラクターたちが生きてきた世界を巡る、聖地巡礼向け情報共有サービスです。</p>
            <h3>にじげんたびでできること</h3>
            <CardGroup className="mt-2">
                <Card bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>検索・MAP表示について</Card.Title>
                        <Card.Text>
                            アニメタイトル作品の検索や、聖地名の検索のほかに、都道府県別の聖地検索ができます。<br />
                            MAP表示は、作品別はもちろん、検索結果別のMAP表示もでき、色々な作品の聖地を一括で見れます。
                        </Card.Text>
                        <center>
                            <Button className="mb-2" variant="primary" onClick={onClickSearchAnime}>アニメ検索</Button><br />
                            <Button variant="primary" onClick={onClickSearchPlace}>聖地検索</Button>
                        </center>
                    </Card.Body>
                </Card>
                <Card bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>コメント投稿について</Card.Title>
                        <Card.Text>
                            それぞれの聖地で、コメント・写真の投稿が可能です。<br />
                            旅の思い出を共有しよう！
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>聖地登録について</Card.Title>
                        <Card.Text>
                            新しい聖地も聖地登録から気軽に登録可能です！<br />
                            放送直後や聖地巡礼前にどんどん追加して、みんなで盛り上げよう！<br />
                            作品が存在しない場合は、アニメ登録から作品申請をお願いします。
                        </Card.Text>
                        <center>
                            <Button className="mb-2" variant="primary" onClick={onClickRegisterPlace}>聖地登録</Button><br />
                            <Button variant="primary" onClick={onClickRegisterAnime}>アニメ申請</Button>
                        </center>
                        
                    </Card.Body>
                </Card>
            </CardGroup>

            <hr />
            {/* {data ? <div>{data.message}</div> : <button onClick={onClickGetData}>FastAPI実行確認</button>} */}
            <p>ページ稼働確認リンク</p>
            <ol>
                <li><Link to="/login">(ログイン)</Link></li>
                <li><Link to="/admin/top">(AdminTop)</Link></li>
                <li><a href="http://localhost:3000/admin/top">(AdminTop href)</a></li>              
            </ol>
        </Container>
    )
});