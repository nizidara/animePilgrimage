import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Map } from "../components/pages/Map";
import { Search } from "../components/pages/Search";
import { RegisterPlace } from "../components/pages/RegisterPlace";
import { Guide } from "../components/pages/Guide";
import { FullLayout } from "../components/templates/FullLayout";
import { Contact } from "../components/pages/Contact";
import { ContactResult } from "../components/pages/ContactResult";
export const Router: FC = memo(() => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FullLayout><Home /></FullLayout>} />
                <Route path="/map" element={<FullLayout><Map /></FullLayout>} />
                <Route path="/search" element={<FullLayout><Search /></FullLayout>} />
                <Route path="/register_place" element={<FullLayout><RegisterPlace /></FullLayout>} />
                <Route path="/guide" element={<FullLayout><Guide /></FullLayout>} />
                <Route path="/contact" element={<FullLayout><Contact /></FullLayout>} />
                <Route path="/contact/result" element={<FullLayout><ContactResult /></FullLayout>} />
                <Route path="*" element={<HeaderLayout><Page404 /></HeaderLayout>} />
            </Routes>
        </BrowserRouter>
    )
})