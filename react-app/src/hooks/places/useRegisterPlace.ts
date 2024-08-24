import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fastAPIURL } from "../../properties/properties";
import { registerPlaceData, responsePlaceData } from "../../type/api/place";
import { registerPlaceFormData } from "../../type/form/place";

//post anime
export const useRegisterPlace = () => {
    const [responseData, setResponseData] = useState<responsePlaceData | null>(null);
    const navigation = useNavigate();
    const url = fastAPIURL;

    //post
    const register = useCallback((placeData : registerPlaceFormData) => {
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

        // axios.post(url + "/places", registerData).then((res) => {
        //     setResponseData(res.data);
        // })

        axios.post(url + "/places", formData).then((res) => {
            setResponseData(res.data);
        })
    }, [setResponseData])

    // responseがnullで無ければ完了ページに遷移
    useEffect(() => {
        if(responseData!== null){
            navigation("/register_place/complete", {state: {responseData}})
        }
    }, [responseData, navigation])

    return {register};
}