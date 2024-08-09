import axios from "axios";
import { FC, memo, useState} from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import useMapboxSearch from "../../../hooks/maps/useMapboxSearch";

type SearchMapboxFormProps = {
    onSearch: (result: { lat: number; lng: number }) => void;
}

export const SearchMapBoxForm: FC<SearchMapboxFormProps> = memo((props) => {
    const {onSearch} = props;
    const { query, setQuery, handleSearch, loading, error } = useMapboxSearch();

    const onClickSearch = () => {
        handleSearch(onSearch);
    };
    
    return (
        <>
            <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={onClickSearch}>Search</button>
        </>
    );
});