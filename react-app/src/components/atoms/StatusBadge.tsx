import { FC, memo } from "react";
import { Badge } from "react-bootstrap";

type StatusBadgeProps = {
    status: number;
}

export const StatusBadge: FC<StatusBadgeProps> = memo((props) => {
    const {status} = props;

    if (status === 0) {
        return <Badge bg="danger">未確認</Badge>; // 赤いバッジ
    }
    if (status === 1) {
        return <Badge bg="warning">確認中</Badge>; // 黄色いバッジ
    }
    if (status === 2) {
        return <Badge bg="success">完了</Badge>; // 緑バッジ
    }
    return null; // flagが0,1, 2以外の場合は何も表示しない
});