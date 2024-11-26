import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { registerPlaceData, responsePlaceData } from "../../type/api/place";
import { registerPlaceFormData } from "../../type/form/place";

//post anime
export const useRegisterPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const navigation = useNavigate();

    //post
    const register = useCallback((placeData : registerPlaceFormData) => {
        setRegisterError(null);

        const { images, ...registerData} : registerPlaceData = {
            ...placeData,
            flag: 1, //display only
            created_user_id: null,  //now null only
            edited_user_id: null    //null only
        }

        const formData = new FormData();

        Object.keys(registerData).forEach((key) => {
            const value = (registerData as any)[key];
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        images.forEach((image) => {
            formData.append('images', image);
        });

        axios.post(`${fastAPIURL}/places`, formData)
        .then((res) => {
            setResponseData(res.data);
        })
        .catch(() => {
            setRegisterError("送信中にエラーが発生しました");
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/register_place/complete", { state: { responseData }, replace: true })
        }
    }, [responseData, navigation])

    return { register, registerError };
}