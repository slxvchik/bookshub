import {Head} from "@inertiajs/react";
import AppLayout from "../../Components/Layouts/AppLayout.jsx";
import React from "react";
import BookForm from "../../Components/Books/BookForm.jsx";

export default function Create({ genres, authors }) {

    return (

        <AppLayout>

            <Head title="Управление книгами"/>

            <div className="container mt-4">

                <BookForm genres={genres} authors={authors} />

            </div>

        </AppLayout>
    );
}
