export const fetchCatalog = async (isOwn, catalogue, path) => {
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

export const uploadAttach = async ( binaryArray ) => {

    // Crear una instancia de FormData
    const formData = new FormData();

    // Agregar cada archivo al FormData
    binaryArray.forEach((file) => {
        formData.append("attachments", file, file.name); // Nombre del campo y nombre del archivo
    });

    const response = await fetch('https://djaguar.herokuapp.com/odoo_com_sistemaetico_grupobd/api/attachment/', {
        method: 'POST',
        headers: {},
        body: formData,
    });

    const result = await response.json();
    console.log( 'uploaded data' );

    return result;

};
