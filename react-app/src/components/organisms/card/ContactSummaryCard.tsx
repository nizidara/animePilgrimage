import { FC, memo } from "react"
import { responseContactData } from "../../../type/api/contact";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";
import { Card } from "react-bootstrap";

import '../../../thema/card/CardStyles.css';

type contactCards = responseContactData & {
    onClickDetail: (contactId: number) => void;
}

export const ContactSummaryCard: FC<contactCards> = memo((props) => {
    const {name, email, title, contact_date, status, contact_id, user_name, onClickDetail} = props;

    return (
        <>
            <Card className="clickable-card" onClick={() => onClickDetail(contact_id)}>
                <Card.Header className="d-flex justify-content-between">
                    <div>
                        {name} ({email}) 
                    </div>
                    <small className="text-muted">{user_name != null && user_name} <DateTimeFormatter datetime={contact_date} /></small>
                </Card.Header>
                <Card.Body className="d-flex justify-content-between">
                    <Card.Text style={{ whiteSpace: 'pre-line' }}>{title}</Card.Text> {status}
                 </Card.Body>
            </Card>
        </>
    )
});