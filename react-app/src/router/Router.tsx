import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Map } from "../components/pages/Map";
import { Search } from "../components/pages/Search";
import { RegisterPlace } from "../components/pages/RegisterPlace";
import { Guide } from "../components/pages/Guide";
export const Router: FC = memo(() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HeaderLayout><Home /></HeaderLayout>} />
                <Route path="/map" element={<HeaderLayout><Map /></HeaderLayout>} />
                <Route path="/search" element={<HeaderLayout><Search /></HeaderLayout>} />
                <Route path="/register_place" element={<HeaderLayout><RegisterPlace /></HeaderLayout>} />
                <Route path="/guide" element={<HeaderLayout><Guide /></HeaderLayout>} />
                <Route path="*" element={<HeaderLayout><Page404 /></HeaderLayout>} />
            </Routes>
        </BrowserRouter>
    )
})