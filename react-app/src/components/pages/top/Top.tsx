import { memo, FC } from "react";
import { Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Top: FC = memo(() =>{
    return (
        <Container>
            <h2 className="mt-2">見てきた世界を、旅しよう。</h2>
            <p>にじげんたびは、アニメで見てきた世界・キャラクターたちが生きてきた世界を巡る、聖地巡礼向け情報共有サービスです。</p>
            <h3 className="mt-2">にじげんたびでできること</h3>
            <CardGroup className="mt-2">
                <Card bg="light" text="dark">
                    <Card.Body>
                        <Card.Title>検索・MAP表示について</Card.Title>
                        <Card.Text>
                            アニメタイトル作品の検索や、聖地名の検索のほかに、都道府県別の聖地検索ができます。<br />
                            MAP表示は、作品別はもちろん、検索結果別のMAP表示もでき、色々な作品の聖地を一括で見れます。
                        </Card.Text>
                        <center>
                            <Link to="/search/anime" className="btn btn-primary mb-2">アニメ検索</Link><br />
                            <Link to="/search/place" className="btn btn-primary">聖地検索</Link>
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
                            <Link to="/register_place" className="btn btn-primary mb-2">聖地登録</Link><br />
                            <Link to="/register_anime" className="btn btn-primary">アニメ申請</Link>
                        </center>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Container>
    )
});