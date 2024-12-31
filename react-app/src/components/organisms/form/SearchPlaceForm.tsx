import { ChangeEvent, FC, FormEvent, memo, useState } from "react"
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useGetRegionList } from "../../../hooks/regions/useGetRegionList";

type SearchPlaceFormProps = {
    initialName: string;
    initialRegionId: string;
    onSearch: (name: string, regionId: string) => void;
  }

export const SearchPlaceForm: FC<SearchPlaceFormProps> = memo((props) => {
    const {initialName, initialRegionId, onSearch } = props
    const { regionList, loading, error } = useGetRegionList();

    const [name, setName] = useState(initialName);
    const [regionId, setRegionId] = useState(initialRegionId);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangeRegion = (e: ChangeEvent<HTMLSelectElement>) => setRegionId(e.target.value);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(name, regionId);
    };

    if (error) return <Alert variant="danger">{error}</Alert>;
    if (loading) return <center><Spinner animation="border" /></center>;
    
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
                        <Form.Control type="search" value={name} maxLength={30} placeholder="聖地名検索" onChange={onChangeName} />
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2} xl={1} xxl={1}>
                        <Button variant="outline-primary" type="submit" disabled={name.length > 30}>検索</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    )
});