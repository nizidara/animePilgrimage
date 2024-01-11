import {memo, FC} from "react";

export const Search: FC = memo(() =>{
    return (
        <>
            <h1>検索ページです．</h1>
            <h2>アニメタイトル検索 or フリーワード？</h2>
            <p>検索エリア①</p>
            <p><a>登録済アニメタイトル一覧の表示リンク</a></p>
            <h2>都道府県検索</h2>
            <p>検索エリア②</p>
            <p>チェックボックスにするか，プルダウンにするか</p>
        </>
    )
        
});