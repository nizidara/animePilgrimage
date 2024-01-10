import { FC, memo, useCallback } from "react"
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Header: FC = memo(() => {
    const navigate = useNavigate();

    const onClickHome = useCallback(() => navigate("/home"), [navigate]);
    const onClickMap = useCallback(() => navigate("/map"), [navigate]);
    const onClickSearch = useCallback(() => navigate("/search"), [navigate]);
    const onClickRegister = useCallback(() => navigate("/register_place"), [navigate]);
    const onClickGuide = useCallback(() => navigate("/guide"), [navigate]);


    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="./home">にじげんたび</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={onClickHome}>Home</Nav.Link>
                            <Nav.Link onClick={onClickMap}>Map</Nav.Link>
                            <Nav.Link onClick={onClickSearch}>検索</Nav.Link>
                            <Nav.Link onClick={onClickRegister}>聖地登録</Nav.Link>
                            <Nav.Link onClick={onClickGuide}>利用ガイド</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
});