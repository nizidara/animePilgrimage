type FeaturesProperties = {
    title: string;
    description?: string | null;
    place_id?: string | null;
    icon?: string | null;
}

export type Features = {
    type: string;
    geometry: {
      type: string;
      coordinates: mapboxgl.LngLatLike;
    };
    properties: FeaturesProperties;
};
  
export type GeoJson = {
    type: string;
    features: Features[];
}

type SearchFeaturesProperties = {
    feature_name: string;
    matching_name: string;
    highlighted_name: string;
    description: string;
    place_name: string;
    id: string;

    place_type: string;
    context: string;
    maki: string;
    poi_category: string;
    poi_category_ids: string;
    internal_id: string;
    external_ids: string;
    mapbox_id: string;
    metadata:string;
    routable_point:string
}

type SearchFeatures = {
    type: string;
    geometry: {
      type: string;
      coordinates: mapboxgl.LngLatLike;
    };
    properties: SearchFeaturesProperties;
}

export type SearchGeoJson = {
    type: string;
    features: SearchFeatures[];
    name: string;
    description: string;
    id: string;
}