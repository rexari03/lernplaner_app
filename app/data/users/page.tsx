'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getAllUsers} from "@/api/userService";
import {Account} from "@/types/account";
import AddForm from "@/components/add-form";
import {useRouter} from "next/navigation";

const UsersPage = () => {
    const [users, setUsers] = useState<Account[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const router = useRouter();

    const fetchUsers = async () => {
        setIsLoading(true);
        const users: Account[] = await getAllUsers();
        setUsers(users);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1)
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(totalPages)
        }
    };

    const handleCloseForm = async () => {
        setShowAddForm(false);
        await fetchUsers()
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div style={{ width: '3rem', height: '3rem' }}>
                    <Spinner animation="border" role="status" style={{ width: '100%', height: '100%' }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className={"text-center display-4"}>Benutzer</h1>
            {showAddForm ? (
                <>
                    <Button variant="secondary" onClick={handleCloseForm} className={"mb-2 w-100"}>
                        <i className="bi bi-x-lg"></i>
                    </Button>
                    <AddForm />
                </>
            ) : (
                <>
                    <Button variant="secondary" onClick={() => setShowAddForm(true)} className={"mb-2 w-100"}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                    {users.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Nachname</th>
                                    <th>Geburtstag</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((User, index) => (
                                    <tr key={index} onClick={() => router.push(`/data/profile/${User.username}`)}>
                                        <td>{User.username}</td>
                                        <td>{User.name}</td>
                                        <td>{User.last_name}</td>
                                        <td>{User.birthday}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className={"d-flex justify-content-center"}>
                                <button onClick={handlePrevious}
                                        className="btn btn-outline-secondary mx-2">
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <span className={"mx-3 align-self-center"}>Page {currentPage} of {totalPages}</span>
                                <button onClick={handleNext}
                                        className="btn btn-outline-secondary mx-2">
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </>
                    ) : null}
                </>
            )}
        </div>
    );
}

export default UsersPage;