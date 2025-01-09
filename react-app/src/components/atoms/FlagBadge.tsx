import { FC, memo } from "react";
import { Badge } from "react-bootstrap";

type FlagBadgeProps = {
    flag: number;
}

export const FlagBadge: FC<FlagBadgeProps> = memo((props) => {
    const {flag} = props;

    if (flag === 0) {
        return <Badge bg="danger">非表示</Badge>; // 赤いバッジ
    }
    if (flag === 2) {
        return <Badge bg="warning">承認待ち</Badge>; // 黄色いバッジ
    }
    return null; // flagが1の場合は何も表示しない
});