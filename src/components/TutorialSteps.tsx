// src/components/TutorialSteps.tsx
"use client";
import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Descargar Templates',
    description: 'Descarga los archivos Excel de ejemplo para cursos y aulas',
  },
  {
    number: 2,
    title: 'Completar Datos',
    description: 'Llena los templates con tus cursos, aulas y disponibilidad horaria',
  },
  {
    number: 3,
    title: 'Subir Archivos',
    description: 'Carga los archivos completados al sistema',
  },
  {
    number: 4,
    title: 'Optimizar y Descargar',
    description: 'Ejecuta la optimización y descarga los resultados',
  },
];

export default function TutorialSteps() {
  return (
    <section id="tutorial" className="mb-5">
      <div className="card">
        <div className="card-header">
          <i className="fas fa-graduation-cap"></i> Tutorial - Cómo usar OptimAulas UNS
        </div>
        <div className="card-body">
          <div className="row">
            {steps.map(({ number, title, description }) => (
              <div className="col-md-3 mb-3" key={number}>
                <div className="step-card card p-3">
                  <div className="d-flex align-items-center mb-3">
                    <div className="step-number me-3">{number}</div>
                    <h5 className="mb-0">{title}</h5>
                  </div>
                  <p className="text-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
