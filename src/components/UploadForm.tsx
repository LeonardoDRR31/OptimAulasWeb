"use client";

import React, { useRef, useEffect } from 'react';

interface Props {
  onFilesSelected: (cursos: File | null, aulas: File | null) => void;
  onUpload: () => Promise<void>;
  loading: boolean;
  disabled: boolean;
  cursosFileName: string | null;
  aulasFileName: string | null;
}

export default function UploadForm({
  onFilesSelected,
  onUpload,
  loading,
  disabled,
  cursosFileName,
  aulasFileName,
}: Props) {
  const cursosDropZoneRef = useRef<HTMLDivElement>(null);
  const cursosFileInputRef = useRef<HTMLInputElement>(null);

  const aulasDropZoneRef = useRef<HTMLDivElement>(null);
  const aulasFileInputRef = useRef<HTMLInputElement>(null);

  const [cursosFile, setCursosFile] = React.useState<File | null>(null);
  const [aulasFile, setAulasFile] = React.useState<File | null>(null);

  // Notificar archivos seleccionados hacia arriba
  useEffect(() => {
    onFilesSelected(cursosFile, aulasFile);
  }, [cursosFile, aulasFile, onFilesSelected]);

  // Setup drop zones para cursos
  useEffect(() => {
    const dropZone = cursosDropZoneRef.current;
    const fileInput = cursosFileInputRef.current;
    if (!dropZone || !fileInput) return;

    const onClick = () => fileInput.click();
    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    };
    const onDragLeave = () => dropZone.classList.remove('dragover');
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer?.files.length) {
        setCursosFile(e.dataTransfer.files[0]);
      }
    };
    const onChange = () => {
      if (fileInput.files?.length) {
        setCursosFile(fileInput.files[0]);
      }
    };

    dropZone.addEventListener('click', onClick);
    dropZone.addEventListener('dragover', onDragOver);
    dropZone.addEventListener('dragleave', onDragLeave);
    dropZone.addEventListener('drop', onDrop);
    fileInput.addEventListener('change', onChange);

    return () => {
      dropZone.removeEventListener('click', onClick);
      dropZone.removeEventListener('dragover', onDragOver);
      dropZone.removeEventListener('dragleave', onDragLeave);
      dropZone.removeEventListener('drop', onDrop);
      fileInput.removeEventListener('change', onChange);
    };
  }, []);

  // Setup drop zones para aulas
  useEffect(() => {
    const dropZone = aulasDropZoneRef.current;
    const fileInput = aulasFileInputRef.current;
    if (!dropZone || !fileInput) return;

    const onClick = () => fileInput.click();
    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    };
    const onDragLeave = () => dropZone.classList.remove('dragover');
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer?.files.length) {
        setAulasFile(e.dataTransfer.files[0]);
      }
    };
    const onChange = () => {
      if (fileInput.files?.length) {
        setAulasFile(fileInput.files[0]);
      }
    };

    dropZone.addEventListener('click', onClick);
    dropZone.addEventListener('dragover', onDragOver);
    dropZone.addEventListener('dragleave', onDragLeave);
    dropZone.addEventListener('drop', onDrop);
    fileInput.addEventListener('change', onChange);

    return () => {
      dropZone.removeEventListener('click', onClick);
      dropZone.removeEventListener('dragover', onDragOver);
      dropZone.removeEventListener('dragleave', onDragLeave);
      dropZone.removeEventListener('drop', onDrop);
      fileInput.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <section id="upload" className="mb-5">
      <div className="card">
        <div className="card-header">
          <i className="fas fa-upload"></i> Subir Archivos de Datos
        </div>
        <div className="card-body">
          <div className="row">
            {/* Cursos */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Archivo de Cursos (Excel)</label>
              <div className="file-drop-zone" ref={cursosDropZoneRef} style={{ cursor: 'pointer' }}>
                <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
                <p>Arrastra el archivo de cursos aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  ref={cursosFileInputRef}
                  className="d-none"
                  accept=".xls,.xlsx"
                  disabled={loading}
                />
                {cursosFileName && <p className="small text-success">Archivo: {cursosFileName}</p>}
              </div>
            </div>
            {/* Aulas */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Archivo de Aulas (Excel)</label>
              <div className="file-drop-zone" ref={aulasDropZoneRef} style={{ cursor: 'pointer' }}>
                <i className="fas fa-cloud-upload-alt fa-3x mb-3 text-muted"></i>
                <p>Arrastra el archivo de aulas aquí o haz clic para seleccionar</p>
                <input
                  type="file"
                  ref={aulasFileInputRef}
                  className="d-none"
                  accept=".xls,.xlsx"
                  disabled={loading}
                />
                {aulasFileName && <p className="small text-success">Archivo: {aulasFileName}</p>}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={onUpload}
              disabled={disabled || loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Procesando...
                </>
              ) : (
                'Subir y Optimizar'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .file-drop-zone {
          border: 2px dashed #ced4da;
          border-radius: 5px;
          padding: 30px;
          text-align: center;
          transition: background-color 0.3s;
        }
        .file-drop-zone.dragover {
          background-color: #e9ecef;
        }
      `}</style>
    </section>
  );
}
