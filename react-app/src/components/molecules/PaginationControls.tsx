import { FC, memo } from "react";
import { Pagination } from "react-bootstrap";

type PaginationControlsProps = {
    currentPage:number;
    totalPages:number;
    onPrevious: () => void;
    onSelect: (page:number) => void;
    onNext: () => void;
};

export const PaginationControls: FC<PaginationControlsProps> = memo((props) => {

    const {currentPage, totalPages, onPrevious, onSelect, onNext} = props;

    const createPageItems = () => {
        const items = [];
        const maxVisiblePages = 5; // 最大表示ページ数
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // 最後のページ付近でページ範囲を調整
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // 最初のページ
        if (startPage > 1) {
            items.push(
                <Pagination.Item
                    key={1}
                    active={1 === currentPage}
                    onClick={() => onSelect(1)}
                >
                    1
                </Pagination.Item>
            );
            if (startPage > 2) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }
        }

        // 範囲内のページ
        for (let page = startPage; page <= endPage; page++) {
            items.push(
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onSelect(page)}
                >
                    {page}
                </Pagination.Item>
            );
        }

        // 最後のページ
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }
            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={totalPages === currentPage}
                    onClick={() => onSelect(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    //ページ数が1の時はページング無し
    if(totalPages === 1 && currentPage === 1) return<></>;

    return (
        <Pagination className="justify-content-center mt-3">
            <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1} />
                {createPageItems()}
            <Pagination.Next onClick={onNext} disabled={currentPage === totalPages} />
        </Pagination>
    )
});