export const applyScale = (marker: mapboxgl.Marker) => {
    const element = marker.getElement();
    const originalTransform = element.style.transform.replace(/scale\(\d*\.?\d*\)/, ''); // 既存のscaleを削除
    element.style.transform = `${originalTransform} scale(1.5)`;
};

export const resetScale = (marker: mapboxgl.Marker) => {
    const element = marker.getElement();
    const originalTransform = element.style.transform.replace(/scale\(\d*\.?\d*\)/, ''); // scale部分を削除
    element.style.transform = originalTransform;
};

export const setupMarkerEvents = (
    marker: mapboxgl.Marker,
    onSelectCoords: (lat: number, lng: number) => void,
    //setSelectedMarker: (marker: mapboxgl.Marker) => void,
    //setSelectedCoords: (coords: [number, number]) => void
) => {

    // クリックイベントの設定
    marker.getElement().addEventListener('click', () => {
        applyScale(marker);
        //setSelectedMarker(marker);
        //setSelectedCoords([marker.getLngLat().lng, marker.getLngLat().lat]);
        onSelectCoords(marker.getLngLat().lat, marker.getLngLat().lng);
    });

    // ドラッグ開始時の処理
    marker.on('dragstart', () => {
        applyScale(marker);
        //setSelectedMarker(marker);
    });

    // ドラッグ終了時の処理
    marker.on('dragend', function () {
        const lngLat = marker.getLngLat();
        //setSelectedCoords([lngLat.lng, lngLat.lat]);
        onSelectCoords(lngLat.lat, lngLat.lng);

        // ドラッグ終了後も選択したマーカーは拡大されたまま
        applyScale(marker);
    });
};
