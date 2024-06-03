'use client'

import React, {useState, useEffect, useMemo} from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Class} from "@/types/class";
import {getAllClasses} from "@/api/classService";
import Button from "react-bootstrap/Button";
import AddStudentForm from "@/components/add-student-form";
import AddClassForm from "@/components/add-class-form";
import {getAllTeachers} from "@/api/teacherService";
import {Teacher} from "@/types/teacher";

const StudentsPage = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const fetchClasses = async () => {
        const users: Class[] = await getAllClasses();
        setClasses(users);
    }

    const fetchTeachers = async () => {
        const users: Teacher[] = await getAllTeachers();
        setTeachers(users);
    }

    useEffect(() => {
        fetchClasses();
        fetchTeachers();
        setIsLoading(false);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = classes.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(classes.length / itemsPerPage);

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
        await fetchClasses();
    };

    function getClassName(school_class_id: number): string {
        let className = "";
        classes.forEach(oneClas => {
            if (oneClas.id == school_class_id) {
                className = oneClas.grade_id + oneClas.name;
            }
        })
        return className
    }

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
            <h1 className={"text-center display-4"}>Klassen</h1>
            {showAddForm ? (
                <>
                    <Button variant="secondary" onClick={handleCloseForm} className={"mb-2 w-100"}>
                        <i className="bi bi-x-lg"></i>
                    </Button>
                    <AddClassForm teachers={teachers}/>
                </>
            ) : (
                <>
                    <Button variant="secondary" onClick={() => setShowAddForm(true)} className={"mb-2 w-100"}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>

                    {classes.length > 0 ? (
                        <>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Klassenname</th>
                                    <th>Klassenlehrer</th>
                                    <th>Kürzel</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((classes, index) => (
                                    <tr key={index}>
                                        <td>{classes.id}</td>
                                        <td>{getClassName(classes.id)}</td>
                                        <td>{classes.head_teacher_name}</td>
                                        <td>{classes.head_teacher_abbreviation}</td>
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