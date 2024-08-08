import { placeData } from '../../testdatas/testdata';
import { GeoJson } from '../../type/externalAPI/mapbox';

type placeData = {
    longitude: number,
    latitude: number,
    name: string,
    comment?: string | null;
    place_id?: string | null;
    file_name?: string | null;
}

export const convertPlaceDataToGeoJson = (props:placeData): GeoJson => {
    const {longitude, latitude, name, comment, place_id, file_name} = props;
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
                    icon: file_name
                }
            },
        ]
    };
};