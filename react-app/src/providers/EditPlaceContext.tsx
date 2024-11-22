import React, { createContext, useContext, useState } from "react";
import { editPlaceFormData } from "../type/form/place";

// 型定義
type EditPlaceContextType = {
    formData: editPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<editPlaceFormData>>;
    animePhoto: string[];
    setAnimePhoto: React.Dispatch<React.SetStateAction<string[]>>;
  };

// Contextを作成
const EditPlaceContext = createContext<EditPlaceContextType | undefined>(undefined);

// カスタムフックを作成
export const useEditPlaceContext = () => {
    const context = useContext(EditPlaceContext);
    if (!context) {
        throw new Error("useEditPlaceContext must be used within a EditPlaceProvider");
    }
    return context;
};

// デフォルト値を定義
const defaultFormData: editPlaceFormData = {
    anime_id: 0,
    name: "",
    latitude: 0,
    longitude: 0,
    comment: null,
    contents: "",
    region_id: 0,
};

export const EditPlaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<editPlaceFormData>(defaultFormData);
    const [animePhoto, setAnimePhoto] = useState<string[]>([])

    return (
        <EditPlaceContext.Provider value={{ formData, setFormData, animePhoto, setAnimePhoto }}>
            {children}
        </EditPlaceContext.Provider>
    );
};