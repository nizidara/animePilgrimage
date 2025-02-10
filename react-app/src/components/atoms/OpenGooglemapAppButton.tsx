import { FC, memo } from "react";
import { Button } from "react-bootstrap";

type openMapProps = {
    coodinates: [number, number];
};

export const OpenGooglemapAppButton: FC<openMapProps> = memo((props) =>{
    const {coodinates} = props

    const openMaps = (lat:number, lng:number) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const appUrl = `geo:${lat},${lng}?q=${lat},${lng}`;
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        if (isMobile) {
            // スマホの場合は Googleマップアプリを開く
            window.location.href = appUrl;
          } else {
            // PCブラウザの場合は新しいタブで開く
            window.open(webUrl, "_blank");
          }
    }

    return (    
        <>
            <Button variant="outline-secondary" size="sm" onClick={() => openMaps(coodinates[1], coodinates[0])}>Googleマップで開く</Button>
        </>
    )
});