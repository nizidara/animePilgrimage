import { placeData } from '../../testdatas/testdata';
import { GeoJson } from '../../type/externalAPI/mapbox';

type placeData = {
    longitude: number,
    latitude: number,
    name: string,
    comment?: string | null;
    place_id?: string | null;
}

export const convertPlaceDataToGeoJson = (props:placeData): GeoJson => {
    const {longitude, latitude, name, comment, place_id} = props;
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
                    place_id: place_id
                }
            },
        ]
    };
};