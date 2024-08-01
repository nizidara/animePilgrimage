import { ChangeEvent, FC, FormEvent, memo, useCallback, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";

type SearchPlaceFormProps = {
    onSearch: (name: string, regionId: string) => void;
  }

export const SearchPlaceForm: FC<SearchPlaceFormProps> = memo(({onSearch}) => {
    const navigate = useNavigate();
    const { regionList } = useGetRegionList();

    const [name, setName] = useState('');
    const [regionId, setRegionId] = useState('');

    const onChangeName = (e:ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeRegion = (e:ChangeEvent<HTMLSelectElement>) => setRegionId(e.target.value);

    //push Enter
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(name, regionId);
    };

    const onClickSearch = useCallback(() => {
        onSearch(name, regionId);
        navigate("/search/place");
      }, [name, regionId, onSearch, navigate]);
    
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="searchPlaceSelectRegion">
                    <Form.Label>都道府県検索（任意）</Form.Label>
                    <Col>
                        <Form.Select className="mb-3" value={regionId} onChange={onChangeRegion}>
                            <option value="">都道府県を選択してください</option>
                            {regionList.map(region => (
                            <option key={region.region_id} value={region.region_id}>{region.region_name}</option>
                        ))}
                        </Form.Select>
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2} xl={1} xxl={1}>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3" controlId="searchPlaceFormName">
                    <Col>
                        <Form.Control type="search" value={name} placeholder="聖地名検索" onChange={onChangeName} />
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2} xl={1} xxl={1}>
                        <Button variant="outline-primary" onClick={onClickSearch}>検索</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
});