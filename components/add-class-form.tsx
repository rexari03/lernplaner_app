'use client'

import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {addNewUser} from "@/api/userService";
import {Col, Row } from 'react-bootstrap';
import {Teacher} from "@/types/teacher";
import {addNewClass} from "@/api/classService";

interface Values {
    name: string,
    grade_id: string,
    head_teacher: string,
}

interface Props {
    teachers: Teacher[];
}

const AddForm: React.FC<Props> = ({ teachers }) => {
    const [values, setValues] = useState<Values>({ name:'', grade_id: '', head_teacher: '' });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // New state variable

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

        setError(null);
        console.log(values);
        await addNewClass(values.name, values.grade_id, values.head_teacher);
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
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Name eingeben" name="name" value={values.name} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Jahrgang</Form.Label>
                                <Form.Control type="text" placeholder="Jahrgang eingeben" name="grade_id" value={values.grade_id} onChange={handleInputChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicClass">
                                <Form.Label>Klasse</Form.Label>
                                <Form.Select name="head_teacher" value={values.head_teacher} onChange={handleInputChange}>
                                    <option value="">-- Wählen Sie einen Lehrer --</option>
                                    {teachers.map((teacher, index) => (
                                        <option key={index} value={teacher.id}>
                                            {teacher.account.username}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

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