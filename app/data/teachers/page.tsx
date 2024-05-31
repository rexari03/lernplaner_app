'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {getAllTeachers} from "@/api/teacherService";
import { Teacher } from '@/types/teacher';
import {useRouter} from "next/navigation";
import Button from "react-bootstrap/Button";
import AddStudentForm from "@/components/add-student-form";
import AddTeacherForm from "@/components/add-teacher-form";

const StudentsPage = () => {
    const [students, setStudents] = useState<Teacher[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const router = useRouter();

    const fetchTeachers = async () => {
        setIsLoading(true);
        const users: Teacher[] = await getAllTeachers();
        setStudents(users);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTeachers();
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

    const handleCloseForm = async () => {
        setShowAddForm(false);
        await fetchTeachers();
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
            {showAddForm ? (
                <>
                    <Button variant="secondary" onClick={handleCloseForm} className={"mb-2 w-100"}>
                        <i className="bi bi-x-lg"></i>
                    </Button>
                    <AddTeacherForm />
                </>
            ) : (
                <>
                    <Button variant="secondary" onClick={() => setShowAddForm(true)} className={"mb-2 w-100"}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                    {students.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Benutzername</th>
                                    <th>Name</th>
                                    <th>Nachname</th>
                                    <th>Kürzel</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((teacher, index) => (
                                    <tr key={index} onClick={() => router.push(`/data/profile/${teacher.account.username}`)}>
                                        <td>{teacher.id}</td>
                                        <td>{teacher.account.username}</td>
                                        <td>{teacher.account.name}</td>
                                        <td>{teacher.account.last_name}</td>
                                        <td>{teacher.abbreviation}</td>
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
                </>
            )}
        </div>
    );
}

export default StudentsPage;