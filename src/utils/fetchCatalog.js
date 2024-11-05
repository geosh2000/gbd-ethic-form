// src/utils/fetchCatalog.js

const fetchCatalog = async (isOwn, catalogue, path) => {
    try {
        const response = await fetch('https://djaguar.herokuapp.com/odoo_com_sistemaetico_grupobd/api/catalogues/retrieve/by-path/?lg=es', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                is_own: isOwn,
                catalogue,
                path: path || '/',
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el catálogo:', error);
        return { data: [] };
    }
};

export default fetchCatalog;
