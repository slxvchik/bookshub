import React, {useState} from "react";
import {Head, router, usePage} from "@inertiajs/react";
import AppLayout from "../../Components/Layouts/AppLayout.jsx";

export default function AuthorsIndex({ authors }) {

    const { errors } = usePage().props;

    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [newItem, setNewItem] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const saveChanges = () => {
        router.put(`/authors/${editingId}`, { name: editValue }, {
            onSuccess: () => {
                setEditingId(null);
                setEditValue('');
            }
        });
    };

    const deleteItem = (id) => {
        if (confirm(`Вы уверены, что хотите удалить этого автора?`)) {
            router.delete(`/authors/${id}`);
        }
    };

    const addItem = () => {
        if (!newItem.trim()) return;

        router.post(`/authors`, { name: newItem }, {
            onSuccess: () => {
                setNewItem('');
                setIsAdding(false);
            }
        });
    };

    return (

        <AppLayout>

            <Head title="Управление жанрами"/>

            <div className="container mt-4">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5>Авторы</h5>

                        {!isAdding ? (
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => setIsAdding(true)}
                            >
                                Добавить нового
                            </button>
                        ) : (
                            <div className="input-group m-lg-2" style={{ width: '100%' }}>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder={`Введите ФИО автора`}
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    autoFocus
                                />
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={addItem}
                                >
                                    Сохранить
                                </button>
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    onClick={() => {
                                        setIsAdding(false);
                                        setNewItem('');
                                    }}
                                >
                                    Отмена
                                </button>
                            </div>
                        )}
                    </div>

                    {errors && Object.keys(errors).length > 0 && (
                        <div className="alert alert-danger mb-4">
                            <ul className="mb-0">
                                {Object.entries(errors).map(([field, message]) => (
                                    <li key={field}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="card-body p-0">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                            <tr>
                                <th style={{ width: '80%' }}>Название</th>
                                <th style={{ width: '20%' }} className="text-end">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {authors.map(item => (
                                <tr key={`${item.id}`}>
                                    <td>
                                        {editingId === item.id ? (
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                autoFocus
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td className="text-end">
                                        {editingId === item.id ? (
                                            <button
                                                className="btn btn-success btn-sm me-1"
                                                onClick={saveChanges}
                                            >
                                                Сохранить
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-outline-primary btn-sm me-1"
                                                    onClick={() => startEditing(item)}
                                                >
                                                    Редактировать
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => deleteItem(item.id)}
                                                >
                                                    Удалить
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </AppLayout>
    );
}
