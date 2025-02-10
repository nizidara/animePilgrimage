import { FC, memo } from "react";
import { Button } from "react-bootstrap";

type openMapProps = {
    coodinates: [number, number];
};

export const OpenGooglemapAppButton: FC<openMapProps> = memo((props) =>{
    const {coodinates} = props

    const openMaps = (lat:number, lng:number) => {
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        if (isIOS) {
            // iPhone / iPad では maps:// を使用
            window.location.href = webUrl;
        } else if (isAndroid) {
            // Android では geo: を使用
            window.location.href = webUrl;
        } else {
            // PCブラウザでは新しいタブでGoogleマップを開く
            window.open(webUrl, "_blank");
        }
    }

    return (    
        <>
            <Button variant="outline-secondary" size="sm" onClick={() => openMaps(coodinates[1], coodinates[0])}>Googleマップで開く</Button>
        </>
    )
});