import React, { createContext, useContext, useState } from "react";
import { deletePlaceFormData } from "../type/form/place";

// 型定義
type DeletePlaceContextType = {
    formData: deletePlaceFormData;
    setFormData: React.Dispatch<React.SetStateAction<deletePlaceFormData>>;
  };

// Contextを作成
const DeletePlaceContext = createContext<DeletePlaceContextType | undefined>(undefined);

// カスタムフックを作成
export const useDeletePlaceContext = () => {
    const context = useContext(DeletePlaceContext);
    if (!context) {
        throw new Error("useDeletePlaceContext must be used within a DeletePlaceProvider");
    }
    return context;
};

// デフォルト値を定義
const defaultFormData: deletePlaceFormData = {
    contents: ""
};

export const DeletePlaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<deletePlaceFormData>(defaultFormData);

    return (
        <DeletePlaceContext.Provider value={{ formData, setFormData }}>
            {children}
        </DeletePlaceContext.Provider>
    );
};