import { ChangeEvent, FC, memo, useCallback, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const SearchAnimeForm: FC = memo(() => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');

    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

    const onClickSearch = useCallback(() => navigate("/search/anime"), [navigate]);
    
    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3 d-flex justify-content-between mt-2" controlId="SearchAnimeFormTitle">
                    <Col>
                        <Form.Control type="search" value={title} placeholder="アニメタイトル絞り込み" onChange={onChangeTitle} />
                    </Col>
                    <Col xs="auto">
                        <Button variant="outline-primary" onClick={onClickSearch}>検索</Button>
                    </Col>
                </Form.Group>
            </Form>
            
        </>
    )
});