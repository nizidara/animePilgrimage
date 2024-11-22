import React, { createContext, useContext, useState } from "react";
import { registerPlaceFormData } from "../type/form/place";

// 型定義
type RegisterPlaceContextType = {
    formData: registerPlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<registerPlaceFormData>>;
    // animeIdContext: number;
  };

// Contextを作成
const RegisterPlaceContext = createContext<RegisterPlaceContextType | undefined>(undefined);

// カスタムフックを作成
export const useRegisterPlaceContext = () => {
    const context = useContext(RegisterPlaceContext);
    if (!context) {
        throw new Error("useRegisterPlaceContext must be used within a RegisterPlaceProvider");
    }
    return context;
};

// デフォルト値を定義
const defaultFormData: registerPlaceFormData = {
    anime_id: 0,
    name: "",
    latitude: 0,
    longitude: 0,
    comment: null,
    region_id: 0,
    images: [],
    icon_index: null,
};

export const RegisterPlaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<registerPlaceFormData>(defaultFormData);
    // const animeIdContext = 0;

    return (
        <RegisterPlaceContext.Provider value={{ formData, setFormData }}>
            {children}
        </RegisterPlaceContext.Provider>
    );
};