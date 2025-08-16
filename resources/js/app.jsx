import './bootstrap';
import '../css/app.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

const el = document.getElementById('app')

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager:true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <PrimeReactProvider>
                <App {...props} />
            </PrimeReactProvider>
        )
    },
    progress: {
        color: '#1E90FF',
    }
})

