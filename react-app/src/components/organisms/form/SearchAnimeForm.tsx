import { ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap";

type FormProps = {
    onSearch: (title: string) => void;
};

export const SearchAnimeForm: FC<FormProps> = memo(({onSearch}) => {
    const [title, setTitle] = useState('');

    const onChangeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);

        //form value empty
        if(e.target.value === ''){
            onSearch('');
        }
    }

    //push Enter
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearch(title);
    };

    //Click Search Button
    const onClickSearch = () => {
        onSearch(title);
    };
    
    return (
        <>
            <Form onSubmit={onSubmit}>
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