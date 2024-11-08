import { FC, memo } from "react"
import { Button } from "react-bootstrap";
import useMapboxSearch from "../../../hooks/maps/useMapboxSearch";

type SearchMapboxFormProps = {
    onSearch: (result: { lat: number; lng: number }) => void;
}

export const SearchMapBoxForm: FC<SearchMapboxFormProps> = memo((props) => {
    const {onSearch} = props;
    const { query, setQuery, handleSearch } = useMapboxSearch();

    const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleSearch(onSearch);
    };
    
    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={onClickSearch}>Search</Button>
        </>
    );
});