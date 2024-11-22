import React, { createContext, useContext, useState } from "react";
import { editAnimeFormData } from "../type/form/anime";

// 型定義
type EditAnimeContextType = {
    formData: editAnimeFormData;
    setFormData: React.Dispatch<React.SetStateAction<editAnimeFormData>>;
  };

// Contextを作成
const EditAnimeContext = createContext<EditAnimeContextType | undefined>(undefined);

// カスタムフックを作成
export const useEditAnimeContext = () => {
    const context = useContext(EditAnimeContext);
    if (!context) {
        throw new Error("useEditAnimeContext must be used within a EditAnimeProvider");
    }
    return context;
};

// デフォルト値を定義
const defaultFormData: editAnimeFormData = {
    title: "",
    introduction: null,
    contents: "",
    icon: null,
};

export const EditAnimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<editAnimeFormData>(defaultFormData);

    return (
        <EditAnimeContext.Provider value={{ formData, setFormData }}>
            {children}
        </EditAnimeContext.Provider>
    );
};