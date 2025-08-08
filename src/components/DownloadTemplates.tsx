// src/components/DownloadTemplates.tsx
"use client";

import React from 'react';

interface Props {
  onDownload: () => Promise<void>;
}

export default function DownloadTemplates({ onDownload }: Props) {
  return (
    <section className="mb-5">
      <div className="card">
        <div className="card-header">
          <i className="fas fa-download"></i> Descargar Formatos de Archivos
        </div>
        <div className="card-body text-center">
          <p className="mb-4">Descarga los templates Excel para completar con tus datos</p>
          <button className="btn btn-warning btn-lg" onClick={onDownload}>
            <i className="fas fa-file-excel"></i> Descargar Templates Excel
          </button>
        </div>
      </div>
    </section>
  );
}
