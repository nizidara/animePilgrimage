import { FC, memo } from "react";
import { Button, Col, Row } from "react-bootstrap";

type PaginationControlsProps = {
    currentPage:number;
    totalPages:number;
    onPrevious: () => void;
    onNext: () => void;
};

export const PaginationControls: FC<PaginationControlsProps> = memo((props) =>{

    const {currentPage, totalPages, onPrevious, onNext} = props;

    return (    
        <Row className="align-items-center mt-2">
            <Col xs={4} sm={5} className="d-flex justify-content-end">
                {currentPage !== 1 && <Button variant="outline-primary" onClick={onPrevious}>前へ</Button>}
            </Col>
            <Col xs={4} sm={2} className="text-center mt-1">
                {currentPage} / {totalPages}
            </Col>
            <Col xs={4} sm={5} className="d-flex justify-content-start">
                {currentPage !== totalPages && <Button variant="outline-primary" onClick={onNext}>次へ</Button>}
            </Col>
        </Row>
    )
});