import { FC, memo } from "react"
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAuth } from "../../../providers/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

export const Header: FC = memo(() => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/logout")
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">にじげんたび</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="検索" id="nav-dropdown-search">
                                <NavDropdown.Item as={NavLink} to="/search/anime">アニメ検索</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/search/place">聖地検索</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="新規登録" id="nav-dropdown-register">
                                <NavDropdown.Item as={NavLink} to="/register_anime">アニメ登録</NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/register_place">聖地登録</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/guide">利用ガイド</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact">お問い合わせ</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            {user ? (
                                <>
                                    <Nav.Link onClick={handleLogout}>ログアウト</Nav.Link>
                                </>
                            ):(
                                <Nav.Link as={NavLink} to="/login">ログイン</Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
});