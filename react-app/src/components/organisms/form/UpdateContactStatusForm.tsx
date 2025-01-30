import { FC, KeyboardEvent, memo, RefObject, useState } from "react"
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useAdminUpdateContactFlag } from "../../../hooks/contacts/useAdminUpdateContactStatus";

type FormProps = {
    contactId: number;
    currentStatus: number;
    formRef: RefObject<HTMLFormElement>;
    onContactStatusUpdated: () => void;
};

export const UpdateContactStatusForm: FC<FormProps> = memo(({contactId, currentStatus, formRef, onContactStatusUpdated}) => {
    const { updateFlag, updateError } = useAdminUpdateContactFlag();

    const [status, setStatus] = useState<number>(currentStatus);

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleFlagSelect = (index: number) => {
        setStatus(index);
    };

    const onClickUpdate = () => {
        updateFlag(contactId, status, onContactStatusUpdated);
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
                            label="未確認"
                            value={0}
                            checked={status === 0}
                            onChange={() => handleFlagSelect(0)}
                        />
                        <Form.Check
                            type="radio"
                            name="flag"
                            id="flag-visible"
                            label="確認中"
                            value={1}
                            checked={status === 1}
                            onChange={() => handleFlagSelect(1)}
                        />
                        <Form.Check
                            type="radio"
                            name="flag"
                            id="flag-pending"
                            label="完了"
                            value={2}
                            checked={status === 2}
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