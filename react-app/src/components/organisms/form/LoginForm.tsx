import { ChangeEvent, FC, FormEvent, memo, useCallback, useState } from "react"
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginData } from "../../../type/api/user";
import { useLoginUser } from "../../../hooks/users/useLoginUser";
import { useAuth } from "../../../providers/AuthContext";


export const LoginForm: FC = memo(() => {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    const onChangeLoginId = (e:ChangeEvent<HTMLInputElement>) => setLoginId(e.target.value);
    const onChangePassword = (e:ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const formData = {loginId, password} as loginData;
    const onClickLogin = (e: FormEvent) => {
        e.preventDefault();
        login(formData);
        navigate("/");
    }

    return (
        <>
            <Form onSubmit={onClickLogin}>
                <Form.Group className="mb-3" controlId="loginFormLoginId">
                    <Form.Label>ログインID</Form.Label>
                    <Form.Control required value={loginId} onChange={onChangeLoginId} autoComplete="username" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="loginFormPassword">
                    <Form.Label>パスワード</Form.Label>
                    <Form.Control required type="password" value={password} onChange={onChangePassword} autoComplete="current-password"/>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">ログイン</Button>
                </div>
            </Form>
            
        </>
    )
});