import { FC, memo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//layout
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { FullLayout } from "../components/templates/FullLayout";

//top
import { Top } from "../components/pages/top/Top";
import { SearchAnime } from "../components/pages/top/SearchAnime";
import { SearchPlace } from "../components/pages/top/SearchPlace";

//anime
import { RegisterAnime } from "../components/pages/anime/RegisterAnime";
import { RegisterAnimeConfirmation } from "../components/pages/anime/RegisterAnimeConfirmation";
import { RegisterAnimeComplete } from "../components/pages/anime/RegisterAnimeComplete";
import { AnimeDetail } from "../components/pages/anime/AnimeDetail";
import { EditRequestAnime } from "../components/pages/anime/EditRequestAnime";
import { EditRequestAnimeConfirmation } from "../components/pages/anime/EditRequestAnimeConfirmation";
import { EditRequestAnimeComplete } from "../components/pages/anime/EditRequestAnimeComplete";

//place
import { RegisterPlace } from "../components/pages/place/RegisterPlace";
import { RegisterPlaceConfirmation } from "../components/pages/place/RegisterPlaceConfirmation";
import { RegisterPlaceComplete } from "../components/pages/place/RegisterPlaceComplete";
import { PlaceList } from "../components/pages/place/PlaceList";
import { PlaceDetail } from "../components/pages/place/PlaceDetail";
import { AddPhotoPlace } from "../components/pages/place/AddPhotoPlace";
import { EditRequestPlace } from "../components/pages/place/EditRequestPlace";
import { EditRequestPlaceConfirmation } from "../components/pages/place/EditRequestPlaceConfirmation";
import { EditRequestPlaceComplete } from "../components/pages/place/EditRequestPlaceComplete";
import { DeleteRequestPlace } from "../components/pages/place/DeleteRequestPlace";
import { DeleteRequestPlaceConfirmation } from "../components/pages/place/DeleteRequestPlaceConfirmation";
import { DeleteRequestPlaceComplete } from "../components/pages/place/DeleteRequestPlaceComplete";

//user
import { Login } from "../components/pages/user/Login";
import { Logout } from "../components/pages/user/Logout";

//comment
import { DeleteRequestComment } from "../components/pages/comment/DeleteRequestComment";
import { DeleteRequestCommentComplete } from "../components/pages/comment/DeleteRequestCommentComplete";

//other
import { Terms } from "../components/pages/other/Terms";
import { Privacy } from "../components/pages/other/Privacy";
import { Contact } from "../components/pages/other/Contact";
import { ContactResult } from "../components/pages/other/ContactResult";
import { Guide } from "../components/pages/other/Guide";
import { Page404 } from "../components/pages/other/Page404";

//admin
import { AdminTop } from "../components/pages/admin/AdminTop";
import { AdminContactList } from "../components/pages/admin/AdminContactList";
import { AdminContactDetail } from "../components/pages/admin/AdminContactDetail";
import { AdminAnimeList } from "../components/pages/admin/AdminAnimeList";
import { AdminAnimeDetail } from "../components/pages/admin/AdminAnimeDetail";
import { AdminPlaceDetail } from "../components/pages/admin/AdminPlaceDetail";
import { AdminPlaceList } from "../components/pages/admin/AdminPlaceList";
import { AdminRequestAnimeList } from "../components/pages/admin/AdminRequestAnimeList";
import { AdminRequestAnimeDetail } from "../components/pages/admin/AdminRequestAnimeDetail";
import { AdminRequestPlaceList } from "../components/pages/admin/AdminRequestPlaceList";
import { AdminRequestPlaceDetail } from "../components/pages/admin/AdminRequestPlaceDetail";
import { AdminRequestCommentList } from "../components/pages/admin/AdminRequestCommentList";
import { AdminRequestCommentDetail } from "../components/pages/admin/AdminRequestCommentDetail";

import { PrivateRoute } from "./PrivateRoute";
import { RegisterAnimeProvider } from "../providers/RegisterAnimeContext";
import { EditAnimeProvider } from "../providers/EditAnimeContext";
import { RegisterPlaceProvider } from "../providers/RegisterPlaceContext";
import { EditPlaceProvider } from "../providers/EditPlaceContext";
import { DeletePlaceProvider } from "../providers/DeletePlaceContext";


export const Router: FC = memo(() => {
    return(
        <BrowserRouter>
            <Routes>
                {/* top */}
                <Route path="/" element={<FullLayout><Top /></FullLayout>} />
                <Route path="/search/anime" element={<FullLayout><SearchAnime /></FullLayout>} />
                <Route path="/search/place" element={<FullLayout><SearchPlace /></FullLayout>} />

                {/* anime */}
                <Route path="/register_anime" element={<RegisterAnimeProvider><FullLayout><RegisterAnime /></FullLayout></RegisterAnimeProvider>} />
                <Route path="/register_anime/confirmation" element={<RegisterAnimeProvider><FullLayout><RegisterAnimeConfirmation /></FullLayout></RegisterAnimeProvider>} />
                <Route path="/register_anime/complete" element={<FullLayout><RegisterAnimeComplete /></FullLayout>} />
                <Route path="/anime" element={<FullLayout><AnimeDetail /></FullLayout>} />
                <Route path="/edit_anime" element={<EditAnimeProvider><FullLayout><EditRequestAnime /></FullLayout></EditAnimeProvider>} />
                <Route path="/edit_anime/confirmation" element={<EditAnimeProvider><FullLayout><EditRequestAnimeConfirmation /></FullLayout></EditAnimeProvider>} />
                <Route path="/edit_anime/complete" element={<FullLayout><EditRequestAnimeComplete /></FullLayout>} />

                {/* place */}
                <Route path="/register_place" element={<RegisterPlaceProvider><FullLayout><RegisterPlace /></FullLayout></RegisterPlaceProvider>} />
                <Route path="/register_place/confirmation" element={<RegisterPlaceProvider><FullLayout><RegisterPlaceConfirmation /></FullLayout></RegisterPlaceProvider>} />
                <Route path="/register_place/complete" element={<FullLayout><RegisterPlaceComplete /></FullLayout>} />
                <Route path="/place/list" element={<FullLayout><PlaceList /></FullLayout>} />
                <Route path="/place" element={<FullLayout><PlaceDetail /></FullLayout>} />
                <Route path="/place/photo" element={<FullLayout><AddPhotoPlace /></FullLayout>} />
                <Route path="/edit_place" element={<EditPlaceProvider><FullLayout><EditRequestPlace /></FullLayout></EditPlaceProvider>} />
                <Route path="/edit_place/confirmation" element={<EditPlaceProvider><FullLayout><EditRequestPlaceConfirmation /></FullLayout></EditPlaceProvider>} />
                <Route path="/edit_place/complete" element={<FullLayout><EditRequestPlaceComplete /></FullLayout>} />
                <Route path="/delete_place" element={<DeletePlaceProvider><FullLayout><DeleteRequestPlace /></FullLayout></DeletePlaceProvider>} />
                <Route path="/delete_place/confirmation" element={<DeletePlaceProvider><FullLayout><DeleteRequestPlaceConfirmation /></FullLayout></DeletePlaceProvider>} />
                <Route path="/delete_place/complete" element={<FullLayout><DeleteRequestPlaceComplete /></FullLayout>} />

                {/* comment */}
                <Route path="/delete_comment" element={<FullLayout><DeleteRequestComment /></FullLayout>} />
                <Route path="/delete_comment/complete" element={<FullLayout><DeleteRequestCommentComplete /></FullLayout>} />

                {/* user */}
                <Route path="/login" element={<FullLayout><Login /></FullLayout>} />
                <Route path="/logout" element={<FullLayout><Logout /></FullLayout>} />

                {/* other */}
                <Route path="/terms" element={<FullLayout><Terms /></FullLayout>} />
                <Route path="/privacy" element={<FullLayout><Privacy /></FullLayout>} />
                <Route path="/guide" element={<FullLayout><Guide /></FullLayout>} />
                <Route path="/contact" element={<FullLayout><Contact /></FullLayout>} />
                <Route path="/contact/result" element={<FullLayout><ContactResult /></FullLayout>} />

                {/* admin */}
                <Route path="/admin/top" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminTop /></FullLayout></PrivateRoute>} />
                <Route path="/admin/anime/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminAnimeList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/anime" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminAnimeDetail /></FullLayout></PrivateRoute>} />
                <Route path="/admin/place/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminPlaceList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/place" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminPlaceDetail /></FullLayout></PrivateRoute>} />
                <Route path="/admin/contact/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminContactList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/contact" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminContactDetail /></FullLayout></PrivateRoute>} />
                <Route path="/admin/request_anime/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestAnimeList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/request_anime" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestAnimeDetail /></FullLayout></PrivateRoute>} />
                <Route path="/admin/request_place/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestPlaceList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/request_place" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestPlaceDetail /></FullLayout></PrivateRoute>} />
                <Route path="/admin/report_comment/list" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestCommentList /></FullLayout></PrivateRoute>} />
                <Route path="/admin/report_comment" element={<PrivateRoute roleRequired="admin"><FullLayout><AdminRequestCommentDetail /></FullLayout></PrivateRoute>} />
                
                <Route path="*" element={<HeaderLayout><Page404 /></HeaderLayout>} />
            </Routes>
        </BrowserRouter>
    )
})