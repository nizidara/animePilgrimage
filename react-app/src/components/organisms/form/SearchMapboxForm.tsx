import { FC,  memo } from "react"
import { Alert, Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import useMapboxSearch, { Suggestion, SearchResult} from "../../../hooks/maps/useMapboxSearch";

type SearchMapboxFormProps = {
    onSearch: (result: SearchResult) => void;
};

export const SearchMapBoxForm: FC<SearchMapboxFormProps> = memo((props) => {
    const { onSearch } = props;
    const {
        query,
        setQuery,
        fetchSuggestions,
        fetchLocationDetails,
        suggestions,
        setSuggestions,
        loading,
        error,
    } = useMapboxSearch();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        if(query.length === 0) {
            setSuggestions([]);
        }
    };

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetchSuggestions();
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        fetchLocationDetails(suggestion.mapbox_id, onSearch);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    return (
        <Form onKeyDown={handleKeyDown}>
            <Form.Group as={Row} className="mb-3" controlId="searchInput">
                <Col>
                    <Form.Control type="search" value={query} maxLength={200} placeholder="ランドマーク名を入力してください" onChange={handleInputChange} />
                    {(query && suggestions.length !== 0) && (
                        <ListGroup className="mt-3 mb-3">
                            {suggestions.map((suggestion) => (
                                <ListGroup.Item
                                    key={suggestion.mapbox_id}
                                    action
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSuggestionClick(suggestion);
                                    }}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{suggestion.name}</div>
                                        <small className="text-muted">{suggestion.address && `(${suggestion.address})`}</small>
                                    </div>
                                    
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </Col>
                <Col xs={3} sm={2} md={2} lg={2} xl={1} xxl={1}>
                    <Button onClick={handleSearch} disabled={query.length > 200 || loading}>{loading ? <Spinner as="span" animation="border" size="sm" /> : "検索"}</Button>
                </Col>
            </Form.Group>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Form>
    );
});