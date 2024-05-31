'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {addNewUser} from "@/api/userService";
import {Col, Row } from 'react-bootstrap';

interface Values {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    last_name: string;
    birthday: string;
}

const AddForm: React.FC = () => {
    const [values, setValues] = useState<Values>({ username: '', email: '', password: '', confirmPassword: '', name: '', last_name: '', birthday: '' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // New state variable

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Check if all fields are filled
        for (let key in values) {
            if (values[key as keyof Values] === '') {
                setError(`Please fill in the ${key} field.`);
                return;
            }
        }

        // Check if passwords match
        if (values.password !== values.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Check if email is valid
        if (!values.email.includes('@')) {
            setError('Invalid email');
            return;
        }

        setError(null);
        console.log(values);
        await addNewUser(values.username, values.email, values.password, values.name, values.last_name, values.birthday);
        setIsSubmitted(true); // Set isSubmitted to true when form is submitted successfully
    };

    return (
        <Container className={"d-flex justify-content-center align-items-center"}>
            <Card className={"w-100"}>
                <Card.Body>
                    <h2 className="text-center mb-4">Registrieren</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {isSubmitted ? (
                        <p style={{ color: 'green' }}>Form submitted successfully!</p>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" placeholder="Name eingeben" name="name" value={values.name} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicLastName">
                                        <Form.Label>Nachname</Form.Label>
                                        <Form.Control type="text" placeholder="Nachname eingeben" name="last_name" value={values.last_name} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Benutzername</Form.Label>
                                        <Form.Control type="text" placeholder="Benutzernamen eingeben" name="username" value={values.username} onChange={handleInputChange} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicBirthday">
                                        <Form.Label>Geburtstag</Form.Label>
                                        <Form.Control type="date" placeholder="Geburtstag" name="birthday" value={values.birthday} onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
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
                                </Col>
                            </Row>

                            <Button variant="secondary" type="submit" className="w-100">
                                Registrieren
                            </Button>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddForm;