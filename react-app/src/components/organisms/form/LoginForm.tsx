import { ChangeEvent, FC, memo, useCallback, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login } from "../../../type/api/user";


export const LoginForm: FC = memo(() => {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeLoginId = (e:ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value);
    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const login = useCallback((formData:login) => navigate("/", {state: {formData}}), [navigate]);
    const formData = {loginId, password} as login;
    const onClickLogin = () => login(formData);

    return (
        <>
            <p>ログインフォームです</p>
            <Form>
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>ログインID</Form.Label>
                    <Form.Control value={loginId} onChange={onChangeLoginId} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="loginFormPassword">
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control type="password" value={password} onChange={onChangePassword}/>
                </Form.Group>

                <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={onClickLogin}>ログイン</Button>
                </div>
            </Form>
            
        </>
    )
});