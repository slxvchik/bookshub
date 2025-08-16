import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from "../../Components/Layouts/AppLayout.jsx";
import {InputText} from "primereact/inputtext";
import {InputSwitch} from "primereact/inputswitch";
import React from "react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <AppLayout>

            <Head title="Войти" />

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-primary">
                            <h5 className="card-title mb-0">Войти</h5>
                        </div>

                        <div className="card-body">
                            <form onSubmit={submit}>
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
                                    <label className="text-sm font-medium mb-1">
                                        <InputSwitch
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) => {
                                                setData('remember', e.value);
                                            }}
                                        />
                                        Remember me
                                    </label>
                                </div>

                                <div className="mb-3 flex flex-column gap-2">
                                    <button type="submit" className="btn btn-primary mb-1" disabled={processing}>
                                        {processing ? 'Process...' : 'Login'}
                                    </button>
                                </div>

                                <div className="mb-3 flex gap-2">
                                    No account? <Link href="/register">Registration</Link>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
