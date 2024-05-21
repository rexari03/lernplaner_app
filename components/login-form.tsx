'use client'

import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {loginUser} from "@/api/authService";

interface Values {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [values, setValues] = React.useState<Values>({ username: '', password: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        const response = loginUser(values.username, values.password)
        console.log(response)
        event.preventDefault();
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Anmelden</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control type="text" placeholder="Benutzernamen eingeben" name="username" value={values.username} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control type="password" placeholder="Passwort" name="password" value={values.password} onChange={handleInputChange} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" className="w-100">
                            Anmelden
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginForm;