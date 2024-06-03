'use client'

import {deleteUserByUsername, getUserByUsername, updateUserByUsername} from "@/api/userService";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation'
import {Class} from "@/types/class";
import {getAllClasses} from "@/api/classService";
import {updateStudentByUsername} from "@/api/studentService";
import {updateTeacherByUsername} from "@/api/teacherService";

interface Params {
    id: string;
}

const ProfilePage = ({ params }: { params: Params }) => {
    const [user, setUser] = useState<User | null>(null);

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [abbreviation, setAbbreviation] = useState<string>("");

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const user = await getUserByUsername(params.id);
            setUser(user);
            setUsername(user.username);
            setName(user.name);
            setLastName(user.last_name);
            setEmail(user.email);
            setBirthday(user.birthday);
            setAbbreviation(user.teacher!.abbreviation);
            setIsLoading(false);
        }
        fetchUser();
    }, [params.id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Möchten Sie den Benutzer wirklich löschen?');
        if (confirmDelete) {
            await deleteUserByUsername(user!.username);
            router.push('/data/teachers');
        }
    }

    const handleBack = () => {
        router.push('/data/teachers');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleCancel = () => {
        setIsEditing(false);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const updatedUser: User = {
            ...user!,
            username: username,
            name: name,
            last_name: lastName,
            email: email,
            birthday: birthday
        };
        setIsLoading(true);
        await updateUserByUsername(updatedUser, user!.username);
        await updateTeacherByUsername(username, {abbreviation: abbreviation})
        setIsEditing(false);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card>
                        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                            User Dashboard
                            <div>
                                {isEditing ? <Button onClick={handleCancel} className={"btn btn-secondary mr-5"}>Abbrechen</Button> : <Button onClick={handleEdit} className={"btn btn-secondary mr-5"}>Bearbeiten</Button>}
                                <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="username">
                                    <Form.Label>Benutzername</Form.Label>
                                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Nachname</Form.Label>
                                    <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                <Form.Group controlId="birthday">
                                    <Form.Label>Geburtstag</Form.Label>
                                    <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                <Form.Group controlId="abbreviation">
                                    <Form.Label>Kürzel</Form.Label>
                                    <Form.Control type="text" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value)} disabled={!isEditing} />
                                </Form.Group>
                                {isEditing && <Button type="submit" variant="primary" className={"mt-3"}>Save</Button>}
                            </Form>
                            <button onClick={handleBack} className="btn btn-secondary mt-3">Zurück</button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;