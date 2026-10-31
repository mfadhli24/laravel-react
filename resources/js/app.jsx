import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

import '../css/app.css';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', {
            eager: true,
        });

        console.log('Page requested:', name);
        console.log('Available pages:', Object.keys(pages));

        return pages[`./pages/${name}.jsx`];
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});