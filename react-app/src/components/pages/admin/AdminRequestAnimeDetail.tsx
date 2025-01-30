import { memo, FC, useCallback } from "react";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAnimeDetail } from "../../../hooks/anime/useGetAnimeDetail";
import { BackAndNextButtons } from "../../molecules/BackAndNextButtons";
import { useAdminGetRequestAnimeDetail } from "../../../hooks/anime/useAdminGetRequestAnimeDetail";
import { EditAnimeDetailDisplay } from "../../organisms/display/EditAnimeDetailDisplay";
import { Icon } from "../../atoms/Icon";
import { AnimeSummaryCard } from "../../organisms/card/AnimeSummaryCard";
import { useAdminApproveEditAnime } from "../../../hooks/anime/useAdminApproveEditAnime";
import { useAdminDeclineEditAnime } from "../../../hooks/anime/useAdminDeclineEditAnime";

export const AdminRequestAnimeDetail: FC = memo(() =>{
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const requestAnimeId = searchParams.get('request_anime_id');
    const animeId = searchParams.get('anime_id');

    const { anime, loading:animeLoading, error:animeError } = useGetAnimeDetail(animeId);
    const { requestAnime, loading, error } = useAdminGetRequestAnimeDetail(requestAnimeId);
    const { approve, approveError } = useAdminApproveEditAnime();
    const { decline, declineError } = useAdminDeclineEditAnime();

    const onClickDetail = useCallback((animeId: number) => navigate(`/admin/anime?anime_id=${animeId}`), [navigate]);
    const onClickTop = useCallback(() => navigate("/admin/top"), [navigate]);
    const onClickBack = useCallback(() => navigate(-1), [navigate]);

    const onClickApprove = (requestAnimeId: string) => {approve(requestAnimeId)};
    const onClickDecline = (requestAnimeId: string) => {decline(requestAnimeId)};

    
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (animeError) return <Alert variant="danger">{animeError}</Alert>;
    if (!requestAnimeId) {
        return <div>No Anime found</div>;
    }

    return (
        <Container>
            <h2>現在のアニメ情報</h2>
            {animeLoading ? <center><Spinner animation="border" /></center> :
                anime &&
                <>
                    <AnimeSummaryCard 
                        anime_id={anime.anime_id}
                        kana={anime.kana}
                        flag={anime.flag}
                        title={anime.title}
                        introduction={anime.introduction}
                        file_name={anime.file_name} 
                        onClickDetail={onClickDetail}
                    />
                </>}
            <h2>リクエスト情報</h2>
            {loading ? <center><Spinner animation="border" /></center> :
                requestAnime && 
                <> 
                    <EditAnimeDetailDisplay 
                        title={requestAnime.title}
                        introduction={requestAnime.introduction}
                        contents={requestAnime.contents}
                        request_anime_id={requestAnime.request_anime_id}
                        request_date={requestAnime.request_date}
                    />
                    {requestAnime.file_name ? <Icon file_name={requestAnime.file_name} />: <p>アイコン修正なし</p>}
                </>
                
            }
            {approveError && <Alert variant="danger">{approveError}</Alert>}
            {declineError && <Alert variant="danger">{declineError}</Alert>}
            
            <BackAndNextButtons backName="却下" nextName="承認" onClickBack={() => onClickDecline(requestAnimeId)} onClickNext={() => onClickApprove(requestAnimeId)} />
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickBack}>戻る</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" onClick={onClickTop}>TOPへ</Button>
            </div>
        </Container>
    )
});