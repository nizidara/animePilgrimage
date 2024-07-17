import { FC, memo } from "react"
import { responseEditAnimeData } from "../../../type/api/anime";
import { DateTimeFormatter } from "../../atoms/DateTimeFormatter";

type editDetailData = Omit<responseEditAnimeData, 'anime_id' | 'request_date' | 'request_type' | 'request_anime_id'> & {
    anime_id?: number | null;
    request_anime_id?: number | null;
    request_date?: string | null;
    request_type?: number | null;
}

export const EditAnimeDetailDisplay: FC<editDetailData> = memo((props) => {
    const {title, introduction, contents, anime_id, request_date, request_type, user_name, user_id, request_anime_id} = props;

    return (
        <>
            {request_anime_id != null && <p>お問い合わせID:{request_anime_id}</p>}
            {request_date != null && <p>お問い合わせ日時:<DateTimeFormatter datetime={request_date} /></p>}
            {user_name != null && <p>ユーザー名:{user_name}({user_id})</p>}
            <p>作品名:{title}{anime_id != null && <div>({anime_id})</div>}</p>
            <p>作品紹介：{introduction}</p>
            <p>修正理由：{contents}</p>
        </>
    )
});