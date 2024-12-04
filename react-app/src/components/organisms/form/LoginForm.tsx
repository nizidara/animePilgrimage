import { ChangeEvent, FC, FormEvent, memo, useState } from "react"
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginData } from "../../../type/api/user";
import { useAuth } from "../../../providers/AuthContext";


export const LoginForm: FC = memo(() => {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const {login} = useAuth();

    const onChangeLoginId = (e:ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value);
    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const formData = {loginId, password} as loginData;

    const onClickLogin = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await login(formData);
            navigate("/");
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <>
            <Form onSubmit={onClickLogin}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>ログインID</Form.Label>
                    <Form.Control required type="text" maxLength={20} pattern="[a-zA-Z0-9_]*" title="ログインIDは半角英数字とアンダーバー（_）のみ使用できます" value={loginId} onChange={onChangeLoginId} autoComplete="username" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="loginFormPassword">
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control required type="password" maxLength={32} value={password} onChange={onChangePassword} autoComplete="current-password"/>
                </Form.Group>

                <Row className="justify-content-center mt-2">
                    <Col xs="auto">
                        <Button variant="primary" type="submit" disabled={loginId.length > 20 || password.length > 32}>ログイン</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
});