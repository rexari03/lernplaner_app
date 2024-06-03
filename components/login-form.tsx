"use client"

import {FormEvent, useState} from 'react';
import {loginUser} from "@/api/authService";
import {useRouter} from "next/navigation";

export default function Login() {
    const router = useRouter()

    // Initialize state for email, password and showError
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false); // Use state for showError
    const [emailError, setEmailError] = useState(false); // Use state for emailError

    // Simple email validation
    const validateEmail = (email: string) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!validateEmail(email)) {
            setEmailError(true); // Set emailError to true when email is not valid
            return;
        }

        const response = await loginUser(email, password)

        if (response != 401) {
            console.log(response);
            router.push('/home')
        } else {
            setShowError(true) // Set showError to true when login fails
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card col-12 col-sm-8 col-md-6 col-lg-4" style={{backgroundColor: '#f5f5f5', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
                <div className="card-body">
                    <h1 className="card-title text-center"><b>Login</b></h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" placeholder="Email" required className="form-control"
                                   value={email} onChange={e => setEmail(e.target.value)}/>
                            {emailError && <p className="text-danger">Invalid email. Please check your email.</p>} {/* Render error message when emailError is true */}
                        </div>
                        <div className="form-group">
                            <label>Passwort:</label>
                            <input type="password" name="password" placeholder="Passwort" required className="form-control"
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-flex justify-content-center mt-2 form-group">
                            <button type="submit" className="btn btn-secondary w-50">Login</button>
                        </div>
                        {showError && <p className="text-danger">Login failed. Please check your credentials.</p>} {/* Render error message when showError is true */}
                    </form>
                </div>
            </div>
        </div>
    );
}