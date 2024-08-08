import { placeData } from '../../testdatas/testdata';
import { GeoJson } from '../../type/externalAPI/mapbox';

type placeData = {
    longitude: number,
    latitude: number,
    name: string,
    comment?: string | null;
    place_id?: string | null;
    anime_icon?: string | null;
}

export const convertPlaceDataToGeoJson = (props:placeData): GeoJson => {
    const {longitude, latitude, name, comment, place_id, anime_icon} = props;
    return {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                properties: {
                    title: name,
                    description: comment,
                    place_id: place_id,
                    icon: anime_icon
                }
            },
        ]
    };
};