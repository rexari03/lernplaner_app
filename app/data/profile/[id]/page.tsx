'use client'

import {deleteUserByUsername, fetchUserByUsername} from "@/api/userService";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Container, Card, Spinner, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation'

interface Params {
    id: string;
}

const ProfilePage = ({ params }: { params: Params }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await fetchUserByUsername(params.id);
            console.log(user);
            setUser(user);
            setIsLoading(false);
        }
        fetchUser();
    }, [params.id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Möchten Sie den Benutzer wirklich löschen?');
        if (confirmDelete) {
            await deleteUserByUsername(user!.username);
            router.push('/data/users');
        }
    }

    const handleBack = () => {
        router.push('/data/users');
    }

    if (isLoading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
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
                            <button onClick={handleDelete} className="btn btn-danger">Löschen</button>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <strong>ID:</strong> {user?.id}
                            </Card.Text>
                            <Card.Text>
                                <strong>Username:</strong> {user?.username}
                            </Card.Text>
                            <Card.Text>
                                <strong>Name:</strong> {user?.name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Last Name:</strong> {user?.last_name}
                            </Card.Text>
                            <Card.Text>
                                <strong>Email:</strong> {user?.email}
                            </Card.Text>
                            <Card.Text>
                                <strong>Birthday:</strong> {user?.birthday}
                            </Card.Text>
                            <button onClick={handleBack} className="btn btn-secondary mt-3">Back to Users</button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;
