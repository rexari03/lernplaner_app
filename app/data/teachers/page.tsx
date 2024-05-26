'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getAllTeachers} from "@/api/teacherService";
import { Teacher } from '@/types/teacher';

const StudentsPage = () => {
    const [students, setStudents] = useState<Teacher[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            const users: Teacher[] = await getAllTeachers();
            setStudents(users);
            setIsLoading(false);
        }
        fetchUsers();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(students.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
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
            <h1 className={"text-center display-4"}>Lehrer</h1>
            {students.length > 0 ? (
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Benutzername</th>
                            <th>Name</th>
                            <th>Nachname</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentItems.map((teachers, index) => (
                            <tr key={index}>
                                <td>{teachers.id}</td>
                                <td>{teachers.account.username}</td>
                                <td>{teachers.account.name}</td>
                                <td>{teachers.account.last_name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                    <div className={"d-flex justify-content-center"}>
                        <button onClick={handlePrevious} disabled={currentPage === 1}
                                className="btn btn-outline-secondary mx-2">
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <span className={"mx-3 align-self-center"}>Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNext} disabled={currentPage === totalPages}
                                className="btn btn-outline-secondary mx-2">
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default StudentsPage;