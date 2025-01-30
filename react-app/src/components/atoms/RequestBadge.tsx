import { FC, memo } from "react";
import { Badge } from "react-bootstrap";

type RequestBadgeProps = {
    type: number;
}

export const RequestBadge: FC<RequestBadgeProps> = memo((props) => {
    const {type} = props;

    if (type === 0) {
        return <Badge bg="warning">修正</Badge>; // 赤いバッジ
    }
    if (type === 1) {
        return <Badge bg="danger">削除</Badge>; // 黄色いバッジ
    }
    return null; // flagが0,1以外の場合は何も表示しない
});