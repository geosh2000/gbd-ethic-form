import React, { useContext } from 'react';

import { AppContext } from '../../appContext';

const FileInput = (  params ) => {

    const { handleFileChange } = useContext(AppContext);

    const field = params.field
    const handleChange = params.handleChange

    const handleDrop = (e, field) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleChange(field, files[0]); // Puedes manejar un solo archivo o múltiples, según necesites
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necesario para permitir el drop
    };

    return (
        <div key={field.key} className="form-group">
            <div className="d-flex">
                <label className={`${field.required ? 'label-required' : ''}`} htmlFor={field.key}>{field.label}</label>
            </div>
            <div key={field.key} 
              className="attachments pointer drop-zone"
              onDrop={(e) => handleDrop(e, field)}
              onDragOver={handleDragOver}
            >
                <div className="attachments-icon-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#292D32" fillRule="evenodd">
                      <path d="M9 22.75c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h6c5.43 0 7.75 2.32 7.75 7.75v6c0 5.43-2.32 7.75-7.75 7.75H9zM2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25V9c0-4.61-1.64-6.25-6.25-6.25H9C4.39 2.75 2.75 4.39 2.75 9z"></path><path d="M6.25 8c0-1.52 1.23-2.75 2.75-2.75S11.75 6.48 11.75 8 10.52 10.75 9 10.75 6.25 9.52 6.25 8zm1.5 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0z"></path><path d="M2.05 19.37a.746.746 0 0 1 .21-1.04l4.93-3.31c1.08-.73 2.57-.64 3.55.19l.33.29c.5.43 1.35.43 1.84 0l4.16-3.57c1.06-.91 2.73-.91 3.8 0l1.63 1.4c.31.27.35.74.08 1.06-.27.31-.74.35-1.06.08l-1.63-1.4c-.5-.43-1.35-.43-1.85 0l-4.16 3.57c-1.06.91-2.73.91-3.8 0l-.33-.29c-.46-.39-1.22-.43-1.73-.08l-4.93 3.31c-.13.08-.28.12-.42.12-.24 0-.48-.12-.62-.33z" fillRule="nonzero"></path>
                    </g>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#292D32" fillRule="evenodd">
                      <path d="M8 12.95c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h7c.41 0 .75.34.75.75s-.34.75-.75.75H8zM8 16.95c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h4.38c.41 0 .75.34.75.75s-.34.75-.75.75H8z" fillRule="nonzero"></path><path d="M10 6.75c-.96 0-2.75 0-2.75-2.75S9.04 1.25 10 1.25h4c.96 0 2.75 0 2.75 2.75 0 .96 0 2.75-2.75 2.75h-4zM8.75 4c0 1.25.26 1.25 1.25 1.25h4c1.25 0 1.25-.26 1.25-1.25 0-1.25-.26-1.25-1.25-1.25h-4c-.99 0-1.25 0-1.25 1.25z"></path><path d="M9 22.75c-5.62 0-6.75-2.58-6.75-6.75v-6c0-4.56 1.65-6.51 5.71-6.72.4-.02.77.29.79.71.02.42-.3.76-.71.78C5.2 4.93 3.75 5.78 3.75 10v6c0 3.7.73 5.25 5.25 5.25h6c4.52 0 5.25-1.55 5.25-5.25v-6c0-4.22-1.45-5.07-4.29-5.23a.757.757 0 0 1-.71-.79c.02-.41.38-.73.79-.71 4.06.22 5.71 2.17 5.71 6.72v6c0 4.18-1.13 6.76-6.75 6.76H9z" fillRule="nonzero"></path>
                    </g>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#292D32" fillRule="evenodd">
                      <path d="M10.02 19.76 7.1 17.93c-.2-.12-.43-.19-.66-.19H5c-2.42 0-3.75-1.33-3.75-3.75v-4c0-2.42 1.33-3.75 3.75-3.75h1.43c.23 0 .46-.07.66-.19l2.92-1.83c1.46-.91 2.88-1.08 4-.46 1.12.62 1.73 1.91 1.73 3.64v9.17c0 1.72-.62 3.02-1.73 3.64-.44.26-.94.38-1.46.38-.79 0-1.66-.28-2.53-.83zM2.75 10v4c0 1.58.67 2.25 2.25 2.25h1.43c.52 0 1.02.14 1.46.42l2.92 1.83c.96.6 1.87.76 2.48.42.61-.34.96-1.19.96-2.32V7.41c0-1.14-.35-1.99-.96-2.32-.61-.34-1.52-.19-2.48.42L7.88 7.33c-.43.28-.94.42-1.45.42H5c-1.58 0-2.25.67-2.25 2.25z"></path><path d="M17.55 16.6a.75.75 0 0 1-.15-1.05 5.94 5.94 0 0 0 0-7.1.75.75 0 0 1 1.2-.9c1.96 2.62 1.96 6.28 0 8.9-.15.2-.37.3-.6.3a.76.76 0 0 1-.45-.15z" fillRule="nonzero"></path><path d="M19.38 19.1a.75.75 0 0 1-.15-1.05c2.67-3.56 2.67-8.54 0-12.1a.75.75 0 0 1 1.2-.9c3.07 4.09 3.07 9.81 0 13.9-.14.2-.37.3-.6.3a.76.76 0 0 1-.45-.15z" fillRule="nonzero"></path>
                    </g>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#292D32" fillRule="evenodd">
                      <path d="M6.81 20.86C3.26 20.86 2 18.37 2 16.05v-8.1c0-3.46 1.35-4.81 4.81-4.81h6.07c3.46 0 4.81 1.35 4.81 4.81v8.1c0 3.46-1.35 4.81-4.81 4.81H6.81zM3.52 7.95v8.1c0 1.23.43 3.29 3.29 3.29h6.07c2.61 0 3.29-.68 3.29-3.29v-8.1c0-2.61-.68-3.29-3.29-3.29H6.81c-2.61 0-3.29.68-3.29 3.29z"></path><path d="m19.17 17.53-2.67-1.87a.754.754 0 0 1-.32-.62V8.96c0-.25.12-.48.32-.62l2.67-1.87c1.19-.83 2.06-.59 2.47-.38.41.22 1.11.79 1.11 2.24v7.33c0 1.45-.7 2.03-1.11 2.24-.19.11-.49.21-.86.21-.43 0-.98-.14-1.61-.58zm.87-1.25c.45.31.77.34.9.27.14-.07.29-.35.29-.89V8.34c0-.55-.16-.82-.29-.89-.13-.07-.45-.04-.9.27l-2.35 1.64v5.28l2.35 1.64zM9.25 9.5c0-1.24 1.01-2.25 2.25-2.25s2.25 1.01 2.25 2.25-1.01 2.25-2.25 2.25-2.25-1.01-2.25-2.25zm1.5 0c0 .41.34.75.75.75s.75-.34.75-.75-.34-.75-.75-.75-.75.34-.75.75z"></path>
                    </g>
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#292D32" fillRule="evenodd">
                      <path d="M9 22.75c-5.43 0-7.75-2.32-7.75-7.75V9c0-5.43 2.32-7.75 7.75-7.75h5c.41 0 .75.34.75.75s-.34.75-.75.75H9C4.39 2.75 2.75 4.39 2.75 9v6c0 4.61 1.64 6.25 6.25 6.25h6c4.61 0 6.25-1.64 6.25-6.25v-5c0-.41.34-.75.75-.75s.75.34.75.75v5c0 5.43-2.32 7.75-7.75 7.75H9z" fillRule="nonzero"></path><path d="M18 10.75c-3.42 0-4.75-1.33-4.75-4.75V2c0-.3.18-.58.46-.69.28-.12.6-.05.82.16l8 8a.751.751 0 0 1-.53 1.28h-4zM14.75 6c0 2.58.67 3.25 3.25 3.25h2.19l-5.44-5.44V6z"></path>
                    </g>
                  </svg>
                </div>
                <input 
                    className="form-control mt-2" 
                    type="file"
                    id={field.key}
                    onChange={ (e) => handleFileChange(field, e)}
                    multiple={true}  // Para admitir múltiples archivos
                />
            </div>
        </div>
    );

}

export default FileInput;