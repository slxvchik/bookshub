import AppLayout from "../../Components/Layouts/AppLayout.jsx";
import {Head, Link, router, usePage} from "@inertiajs/react";
import {useEffect, useMemo, useState} from "react";
import BookList from "../../Components/Books/BookList.jsx";
import Pagination from "../../Components/UI/Pagination.jsx";
import {MultiSelect} from "primereact/multiselect";
import {InputNumber} from "primereact/inputnumber";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {Slider} from "primereact/slider";

export default function BookIndex({books, authors, genres}) {  //filters,

    const { auth } = usePage().props;

    const cleanFilters = (filters) => {
        const cleaned = {};
        for (const key in filters) {
            if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
                cleaned[key] = filters[key];
            }
        }
        return cleaned;
    };

    const [localFilters, setLocalFilters] = useState({
        authorIds: [],
        title: '',
        genreIds: [],
        yearFrom: 1800,
        yearTo: 2025,
        sortBy: 'title',
        sortDir: 'asc',
    });

    const yearRange = [localFilters.yearFrom, localFilters.yearTo];

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);

        const genreIds = [];
        searchParams.forEach((value, key) => {
            if (key.startsWith('genreIds[')) {
                genreIds.push(parseInt(value));
            }
        });

        const authorIds = [];
        searchParams.forEach((value, key) => {
            if (key.startsWith('authorIds[')) {
                authorIds.push(parseInt(value));
            }
        });

        const yearFrom = searchParams.has('yearFrom')
            ? parseInt(searchParams.get('yearFrom'))
            : 1800;

        const yearTo = searchParams.has('yearTo')
            ? parseInt(searchParams.get('yearTo'))
            : 2025;

        setLocalFilters({
            authorIds: authorIds,
            title: searchParams.get('title') || '',
            genreIds: genreIds,
            yearFrom: yearFrom,
            yearTo: yearTo,
            sortBy: searchParams.get('sortBy') || 'title',
            sortDir: searchParams.get('sortDir') || 'asc',
        });
    }, []);

    const handleYearRangeChange = (e) => {

        let [yearFrom, yearTo] = e.value;

        if (yearFrom > yearTo) return;

        setLocalFilters(prev => ({
            ...prev,
            yearFrom,
            yearTo
        }));
    };

    const applyFilters = () => {
        router.get('/', cleanFilters(localFilters), {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setLocalFilters({
            authorIds: [],
            title: '',
            genreIds: [],
            yearFrom: 1800,
            yearTo: 2025,
            sortBy: 'title',
            sortDir: 'asc',
        });
        router.get('/', {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleSortChange = (e) => {
        const [sortBy, sortDir] = e.target.value.split('_');
        setLocalFilters(prev => ({
            ...prev,
            sortBy,
            sortDir
        }));
    };

    const genreOptions = genres.map(genre => ({
        label: genre.name,
        value: genre.id
    }));

    const authorOptions = authors.map(author => ({
        label: author.name,
        value: author.id
    }));

    return (

        <AppLayout>

            <Head title="Books development"/>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Book Management</h1>
                { auth.user && (
                    <Link href="/books/create" className="btn btn-primary">
                        Add book
                    </Link>
                )}
            </div>

            <div className="card mb-4">

                <div className="card-body">

                    <div className="flex flex-wrap align-items-end gap-3">

                        <div className="flex-auto">
                            <label className="text-sm font-medium mb-1">Title</label>
                            <InputText
                                value={localFilters.title}
                                onChange={(e) => setLocalFilters({...localFilters, title: e.target.value})}
                                className="w-full p-inputtext-sm"
                                placeholder="Input your title"
                            />
                        </div>

                        <div className="flex-auto" style={{width: '200px'}}>
                            <label className="text-sm font-medium mb-1">Author</label>
                            <MultiSelect
                                value={localFilters.authorIds || []}
                                onChange={(e) => setLocalFilters({...localFilters, authorIds: e.value})}
                                options={authorOptions}
                                optionLabel="label"
                                placeholder="Choose author"
                                className="w-full p-multiselect-sm"
                                display="chip"
                            />
                        </div>

                        <div className="flex-auto" style={{width: '200px'}}>
                            <label className="text-sm font-medium mb-1">Genres</label>
                            <MultiSelect
                                value={localFilters.genreIds || []}
                                onChange={(e) => setLocalFilters({...localFilters, genreIds: e.value})}
                                options={genreOptions}
                                optionLabel="label"
                                placeholder="Choose genre"
                                className="w-full p-multiselect-sm"
                                display="chip"
                            />
                        </div>

                        <div className="flex-auto" style={{width: '300px'}}>
                            <label className="text-sm font-medium mb-1">Publication year</label>
                            <div className="p-2">
                                <Slider
                                    value={[localFilters.yearFrom, localFilters.yearTo]}
                                    onChange={handleYearRangeChange}
                                    range
                                    min={1800}
                                    max={2025}
                                    className="w-full"
                                />
                                <div className="flex justify-content-between mt-2">
                                    <span>{localFilters.yearFrom}</span>
                                    <span>{localFilters.yearTo}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-auto" style={{width: '220px'}}>
                            <label className="text-sm font-medium mb-1">Sorts</label>
                            <Dropdown
                                value={`${localFilters.sortBy}_${localFilters.sortDir}`}
                                onChange={handleSortChange}
                                options={[
                                    {label: "Title (A-Z)", value: "title_asc"},
                                    {label: "Title (Z-A)", value: "title_desc"},
                                    {label: "Year (older)", value: "year_asc"},
                                    {label: "Year (newest)", value: "year_desc"}
                                ]}
                                placeholder="Choose sort"
                                className="w-full p-dropdown-sm"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                label="Apply"
                                icon="pi pi-check"
                                className="p-button-sm"
                                onClick={applyFilters}
                            />
                            <Button
                                label="Reset"
                                icon="pi pi-times"
                                className="p-button-sm p-button-outlined"
                                onClick={resetFilters}
                            />
                        </div>

                    </div>

                </div>

            </div>

            {books && books?.data && books.data.length > 0 ? (
                <BookList books={books}/>
            ) : (
                <h3 className="text-muted mb-3">No Books Found</h3>
            )}

        </AppLayout>
    );
}
