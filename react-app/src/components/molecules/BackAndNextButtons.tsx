import { FC, memo } from "react";
import { Button, Col, Row } from "react-bootstrap";

type ButtonsProps = {
    backName:string;
    nextName:string;
    onClickBack: () => void;
    onClickNext: () => void;
};

export const BackAndNextButtons: FC<ButtonsProps> = memo((props) =>{

    const {backName, nextName, onClickBack, onClickNext} = props;

    return (    
        <Row className="d-flex justify-content-center">
            <Col xs="auto" sm="auto" className="d-grid">
                <Button variant="secondary" onClick={onClickBack}>{backName}</Button>
            </Col>
            <Col xs="auto" sm="auto" className="d-grid">
                <Button variant="primary" onClick={onClickNext}>{nextName}</Button>
            </Col>
        </Row>
    )
});