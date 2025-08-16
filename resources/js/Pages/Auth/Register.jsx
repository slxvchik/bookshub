import {Head, Link, useForm, usePage} from '@inertiajs/react';
import AppLayout from "../../Components/Layouts/AppLayout.jsx";
import {InputText} from "primereact/inputtext";
import React from "react";

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <AppLayout>

            <Head title="Registration" />

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h5 className="card-title mb-0">Registration</h5>
                        </div>

                        <div className="card-body">
                            {errors && Object.keys(errors).length > 0 && (
                                <div className="alert alert-danger mb-4">
                                    <ul className="mb-0">
                                        {Object.entries(errors).map(([field, message]) => (
                                            <li key={field}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <form onSubmit={submit}>
                                <div className="mb-3 flex flex-column gap-2">
                                    <label htmlFor="name" className="text-sm font-medium mb-1">Name</label>
                                    <InputText
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    {errors.name && <div className="p-error">{errors.name}</div>}
                                </div>

                                <div className="mb-3 flex flex-column gap-2">
                                    <label htmlFor="email" className="text-sm font-medium mb-1">Email</label>
                                    <InputText
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email && <div className="p-error">{errors.email}</div>}
                                </div>

                                <div className="mb-3 flex flex-column gap-2">
                                    <label htmlFor="password" className="text-sm font-medium mb-1">Password</label>
                                    <InputText
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {errors.password && <div className="p-error">{errors.password}</div>}
                                </div>

                                <div className="mb-3 flex flex-column gap-2">
                                    <label htmlFor="password_confirmation" className="text-sm font-medium mb-1">Password confirm</label>
                                    <InputText
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                </div>

                                <div className="mb-3 flex flex-column gap-2">
                                    <button type="submit" disabled={processing} className="btn btn-primary mb-1">
                                        {processing ? 'Process...' : 'Register'}
                                    </button>
                                </div>

                                <div className="mb-3 flex gap-2">
                                    Do you already have an account? <Link href="/login">Login</Link>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
