import { FC, memo } from "react";
import { Button, Col, Row } from "react-bootstrap";

type ButtonsProps = {
    backName:string;
    nextName:string;
    onClickBack: () => void;
    onClickNext: () => void;
    nextDisabled?: boolean;
};

export const BackAndNextButtons: FC<ButtonsProps> = memo((props) =>{

    const {backName, nextName, onClickBack, onClickNext, nextDisabled = false} = props;

    return (    
        <Row className="d-flex justify-content-center">
            <Col xs="auto" sm="auto" className="d-grid">
                <Button variant="secondary" onClick={onClickBack} disabled={nextDisabled}>{backName}</Button>
            </Col>
            <Col xs="auto" sm="auto" className="d-grid">
                <Button variant="primary" onClick={onClickNext} disabled={nextDisabled}>{nextName}</Button>
            </Col>
        </Row>
    )
});