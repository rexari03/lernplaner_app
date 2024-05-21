'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

interface Values {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {
    const [values, setValues] = useState<Values>({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!values.email.includes('@')) {
            setError('Invalid email');
            return;
        }

        setError(null);
        console.log(values);
        // Handle form submission here
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Registrieren</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control type="text" placeholder="Benutzernamen eingeben" name="username" value={values.username} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email eingeben" name="email" value={values.email} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control type="password" placeholder="Passwort" name="password" value={values.password} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Passwort bestätigen</Form.Label>
                            <Form.Control type="password" placeholder="Passwort bestätigen" name="confirmPassword" value={values.confirmPassword} onChange={handleInputChange} />
                        </Form.Group>

                        <Button variant="secondary" type="submit" className="w-100">
                            Registrieren
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignupForm;