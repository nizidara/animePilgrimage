import { ChangeEvent, FC, FormEvent, memo, useCallback, useState } from "react"
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
    const onClickLogin = (e: FormEvent) => {
        e.preventDefault();
        login(formData);
    }

    return (
        <>
            <Form onSubmit={onClickLogin}>
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>ログインID</Form.Label>
                    <Form.Control required value={loginId} onChange={onChangeLoginId} />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="loginFormPassword">
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control required type="password" value={password} onChange={onChangePassword}/>
                </Form.Group>

                <div className="d-grid gap-2">
                <Button variant="primary" type="submit">ログイン</Button>
                </div>
            </Form>
            
        </>
    )
});