import { format, parseISO } from "date-fns";
import { toZonedTime } from 'date-fns-tz';
import { FC, memo } from "react";

type DateTimeProps = {
    datetime: string;
};

export const DateTimeFormatter: FC<DateTimeProps> = memo((props) =>{

    const {datetime} = props;

    // ISO形式の日付文字列をDateオブジェクトにパース
    const datetimeWithZ = datetime.endsWith('Z') ? datetime : `${datetime}Z`;
    const parsedDate = parseISO(datetimeWithZ);


    // 現在地のタイムゾーンを取得
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // UTCから現在地のタイムゾーンに変換
    const zonedDate = toZonedTime(parsedDate, timeZone);

    // フォーマットを変更
    const formattedDate = format(zonedDate, 'yyyy/MM/dd HH:mm');

    return (    
        <>
            {formattedDate}
        </>
    )
});