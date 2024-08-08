import { responsePlaceData } from '../../type/api/place';
import { Features, GeoJson } from '../../type/externalAPI/mapbox';

export const convertPlaceToFeature = (place: responsePlaceData): Features => {
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [place.longitude, place.latitude] // Note that longitude comes first in GeoJSON
        },
        properties: {
            title: place.name,
            description: place.comment,
            place_id: place.place_id,
            icon: place.file_name
        }
    };
};

export const convertPlaceListToGeoJson = (placeList: responsePlaceData[]): GeoJson => {
    const features: Features[] = placeList.map(place => convertPlaceToFeature(place));
    return {
        type: 'FeatureCollection',
        features: features
    };
};