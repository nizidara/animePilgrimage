import { ChangeEvent, FC, memo, useCallback, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const SearchPlaceForm: FC = memo(() => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [regionId, setRegionId] = useState('');

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeRegion = (e:ChangeEvent<HTMLSelectElement>) => setRegionId(e.target.value);

    const onClickSearch = useCallback(() => navigate("/search/place"), [navigate]);
    
    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="searchPlaceSelectRegion">
                    <Form.Label>都道府県検索（任意）</Form.Label>
                    <Col sm="10">
                        <Form.Select className="mb-3" value={regionId} onChange={onChangeRegion}>
                            <option>都道府県を選択してください</option>
                            <option value="1">北海道</option>
                            <option value="2">東京都</option>
                            <option value="3">海外</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3" controlId="searchPlaceFormName">
                    <Col sm="10">
                        <Form.Control type="search" value={name} placeholder="聖地名検索" onChange={onChangeName} />
                    </Col>
                    <Col sm="2">
                        <Button  variant="secondary" onClick={onClickSearch}>検索</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
});