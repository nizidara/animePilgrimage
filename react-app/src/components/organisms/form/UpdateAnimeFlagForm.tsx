import { FC, KeyboardEvent, memo, RefObject, useState } from "react"
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useAdminUpdateAnimeFlag } from "../../../hooks/anime/useAdminUpdateAnimeFlag";

type FormProps = {
    animeId: number;
    currentflag: number;
    formRef: RefObject<HTMLFormElement>;
    onAnimeFlagUpdated: () => void;
};

export const UpdateAnimeFlagForm: FC<FormProps> = memo(({animeId, currentflag, formRef, onAnimeFlagUpdated}) => {
    const { updateFlag, updateError } = useAdminUpdateAnimeFlag();

    const [flag, setFlag] = useState<number>(currentflag);

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleFlagSelect = (index: number) => {
        setFlag(index);
    };

    const onClickUpdate = () => {
        updateFlag(animeId, flag, onAnimeFlagUpdated);
    };
    
    return (
        <Card className="p-3 mt-2 mb-2">
            <Form ref={formRef} onKeyDown={handleKeyDown}>
                <Form.Label>フラグ更新</Form.Label>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Check
                            type="radio"
                            name="flag"
                            id="flag-hidden"
                            label="非表示"
                            value={0}
                            checked={flag === 0}
                            onChange={() => handleFlagSelect(0)}
                        />
                        <Form.Check
                            type="radio"
                            name="flag"
                            id="flag-visible"
                            label="表示"
                            value={1}
                            checked={flag === 1}
                            onChange={() => handleFlagSelect(1)}
                        />
                        <Form.Check
                            type="radio"
                            name="flag"
                            id="flag-pending"
                            label="承認待ち"
                            value={2}
                            checked={flag === 2}
                            onChange={() => handleFlagSelect(2)}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" onClick={onClickUpdate}>
                            更新
                        </Button>
                    </Col>
                </Row>
                {updateError && (
                    <Row className="mt-3">
                        <Col>
                            <Alert variant="danger">{updateError}</Alert>
                        </Col>
                    </Row>
                )}
            </Form>
        </Card>
    )
});