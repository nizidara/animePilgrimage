import { ChangeEvent, FC, KeyboardEvent, memo } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";
import useMapboxSearch from "../../../hooks/maps/useMapboxSearch";

type SearchMapboxFormProps = {
    onSearch: (result: { lat: number; lng: number }) => void;
}

export const SearchMapBoxForm: FC<SearchMapboxFormProps> = memo((props) => {
    const { onSearch } = props;
    const { query, setQuery, handleSearch } = useMapboxSearch();

    const onChangeQuery = (e:ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

    const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleSearch(onSearch);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    
    return (
        <>
            <Form onKeyDown={handleKeyDown}>
                <Form.Group as={Row} className="mb-3" controlId="searchPlaceFormName">
                    <Col>
                        <Form.Control type="search" value={query} placeholder="ランドマーク名を入力してください" onChange={onChangeQuery} />
                    </Col>
                    <Col xs={3} sm={2} md={2} lg={2} xl={1} xxl={1}>
                        <Button onClick={onClickSearch}>検索</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
});