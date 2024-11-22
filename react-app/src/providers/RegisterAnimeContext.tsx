import React, { createContext, useContext, useState } from "react";
import { registerAnimeFormData } from "../type/form/anime";

// 型定義
type RegisterAnimeContextType = {
    formData: registerAnimeFormData;
    setFormData: React.Dispatch<React.SetStateAction<registerAnimeFormData>>;
  };

// Contextを作成
const RegisterAnimeContext = createContext<RegisterAnimeContextType | undefined>(undefined);

// カスタムフックを作成
export const useRegisterAnimeContext = () => {
    const context = useContext(RegisterAnimeContext);
    if (!context) {
        throw new Error("useRegisterAnimeContext must be used within a RegisterAnimeProvider");
    }
    return context;
};

// デフォルト値を定義
const defaultFormData: registerAnimeFormData = {
    title: "",
    kana: "",
    introduction: null,
    icon: null,
};

export const RegisterAnimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formData, setFormData] = useState<registerAnimeFormData>(defaultFormData);

    return (
        <RegisterAnimeContext.Provider value={{ formData, setFormData }}>
            {children}
        </RegisterAnimeContext.Provider>
    );
};