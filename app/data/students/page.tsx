'use client'

import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {fetchAllStudents} from "@/api/studentService";
import {StudentBrief} from "@/types/studentBrief";
import {useRouter} from "next/navigation";
import {Class} from "@/types/class";
import {getAllClasses} from "@/api/classService";
import Button from "react-bootstrap/Button";
import AddStudentForm from "@/components/add-student-form";

const StudentsPage = () => {
    const [students, setStudents] = useState<StudentBrief[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [isLoading, setIsLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const router = useRouter();

    const fetchStudents = async () => {
        const users: StudentBrief[] = await fetchAllStudents();
        setStudents(users);
    }
    const fetchClasses = async () => {
        const classes: Class[] = await getAllClasses();
        setClasses(classes);
    }

    useEffect( () => {
        setIsLoading(true);
        fetchStudents();
        fetchClasses();
        setIsLoading(false);
    }, []);

    const handleNext = () => {
        if (currentPage < calculatePagination().totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setCurrentPage(1)
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else {
            setCurrentPage(calculatePagination().totalPages)
        }
    };

    const calculatePagination = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

        const totalPages = Math.ceil(students.length / itemsPerPage);

        return { currentItems, totalPages };
    }

    const handleCloseForm = async () => {
        setShowAddForm(false);
        await fetchStudents();
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
            <h1 className={"text-center display-4"}>Schüler</h1>
            {showAddForm ? (
                <>
                    <Button variant="secondary" onClick={handleCloseForm} className={"mb-2"}>
                        <i className="bi bi-x-lg"></i>
                    </Button>
                    <AddStudentForm schoolClasses={classes}/>
                </>
            ) : (
                <>
                    <Button variant="secondary" onClick={() => setShowAddForm(true)} className={"mb-2"}>
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
                                    <th>Geburtstag</th>
                                    <th>Klasse</th>
                                </tr>
                                </thead>
                                <tbody>
                                {calculatePagination().currentItems.map((student, index) => (
                                    <tr key={index} onClick={() => router.push(`/data/student/${student.account.username}`)}>
                                        <td>{student.id}</td>
                                        <td>{student.account.username}</td>
                                        <td>{student.account.name}</td>
                                        <td>{student.account.last_name}</td>
                                        <td>{student.account.birthday}</td>
                                        <td>{classes[student.school_class_id-1].name}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <div className={"d-flex justify-content-center"}>
                                <button onClick={handlePrevious}
                                        className="btn btn-outline-secondary mx-2">
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <span className={"mx-3 align-self-center"}>Page {currentPage} of {calculatePagination().totalPages}</span>
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

export default StudentsPage;