import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Maneja los archivos aquí
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // Permite múltiples archivos
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aquí...</p>
      ) : (
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos
        </p>
      )}
    </div>
  );
};

export default FileUpload;