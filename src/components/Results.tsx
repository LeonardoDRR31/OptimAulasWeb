// src/components/Results.tsx
"use client";

import React from 'react';

import { Assignment } from '../models/esquema';

interface Props {
  assignments: Assignment[];
  statistics: {
    total_assignments: number;
    conflicts: number;
    best_fitness: number;
    fitness_history: number[];
  };
}

export default function Results({ assignments, statistics }: Props) {
  return (
    <section id="results" className="mb-5">
      <div className="card">
        <div className="card-header">Resultados</div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Total Asignaciones:</strong> {statistics.total_assignments} |{' '}
            <strong>Conflictos:</strong> {statistics.conflicts} |{' '}
            <strong>Mejor Fitness:</strong> {Math.round(statistics.best_fitness)}
          </div>
          <div className="table-responsive" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <table className="table table-striped table-hover" id="resultsTable">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Ciclo</th>
                  <th>Tipo</th>
                  <th>Estudiantes</th>
                  <th>Aula</th>
                  <th>Capacidad</th>
                  <th>Ubicación</th>
                  <th>Horario</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{assignment.curso_nombre}</strong>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          assignment.ciclo ? 'bg-primary' : 'bg-secondary'
                        }`}
                      >
                        {assignment.ciclo}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          assignment.tipo === 'laboratorio' ? 'bg-info' : 'bg-secondary'
                        }`}
                      >
                        {assignment.tipo}
                      </span>
                    </td>
                    <td>{assignment.estudiantes}</td>
                    <td>
                      <strong>{assignment.aula_nombre}</strong>
                    </td>
                    <td>{assignment.capacidad}</td>
                    <td>
                      <span
                        className={`badge ${
                          assignment.ubicacion === 'Campus' ? 'bg-success' : 'bg-warning'
                        }`}
                      >
                        {assignment.ubicacion}
                      </span>
                    </td>
                    <td>{assignment.horario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
