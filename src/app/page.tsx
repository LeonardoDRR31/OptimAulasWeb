"use client";
// src/pages/index.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';

import TutorialSteps from '../components/TutorialSteps';
import DownloadTemplates from '../components/DownloadTemplates';
import UploadForm from '../components/UploadForm';
import Results from '../components/Results';
import Analysis from '../components/Analysis';

import {
  checkBackendStatus,
  downloadTemplates,
  uploadFiles,
  optimize,
  downloadResult,
} from '../lib/api';

export default function Home() {
  // Estado
  const [cursosFile, setCursosFile] = useState<File | null>(null);
  const [aulasFile, setAulasFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<any[] | null>(null);
  const [statistics, setStatistics] = useState({
    total_assignments: 0,
    conflicts: 0,
    best_fitness: 0,
    fitness_history: [] as number[],
  });

  // Estado nombres archivos para mostrar
  const [cursosFileName, setCursosFileName] = useState<string | null>(null);
  const [aulasFileName, setAulasFileName] = useState<string | null>(null);

  // Verificar backend
  useEffect(() => {
    checkBackendStatus()
      .then(({ message }) => console.log('✅ Backend conectado:', message))
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Backend no disponible',
          text: 'Asegúrate de que el backend esté ejecutándose en http://localhost:5000',
          footer: 'Ejecuta: python app.py',
        });
      });
  }, []);

  // Actualizar archivos seleccionados
  const handleFilesSelected = useCallback((cursos:File | null, aulas: File | null) => {
    setCursosFile(cursos);
    setAulasFile(aulas);
    setCursosFileName(cursos?.name || null);
    setAulasFileName(aulas?.name || null);
  }, []);

  // Descargar templates
  const handleDownloadTemplates = async () => {
    try {
      const blob = await downloadTemplates();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'templates_asignacion_aulas.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      Swal.fire('Descargado', 'Templates descargados correctamente', 'success');
    } catch (error) {
      Swal.fire('Error', (error as Error).message, 'error');
    }
  };

  // Subir archivos y optimizar
  const handleUpload = async () => {
    if (!cursosFile || !aulasFile) {
      Swal.fire('Error', 'Por favor selecciona ambos archivos antes de subir', 'warning');
      return;
    }
    setLoading(true);
    try {
      await uploadFiles(cursosFile, aulasFile);
      const result = await optimize();
      setCurrentSolution(result.solution);
      setStatistics({
        total_assignments: result.total_assignments,
        conflicts: result.conflicts,
        best_fitness: result.best_fitness,
        fitness_history: result.fitness_history,
      });
      Swal.fire('Optimización completa', 'Puedes revisar los resultados abajo.', 'success');
    } catch (error) {
      Swal.fire('Error', (error as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Descargar resultados
  const handleDownloadResults = async () => {
    if (!currentSolution) return;

    try {
      const blob = await downloadResult(currentSolution);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resultado.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      Swal.fire('Descargado', 'Archivo de resultados descargado', 'success');
    } catch (error) {
      Swal.fire('Error', (error as Error).message, 'error');
    }
  };

  // Estadísticas para análisis (ejemplo, se pueden ajustar según datos reales)
  const campusCount = currentSolution?.filter((a) => a.ubicacion === 'Campus').length || 0;
  const externalCount = currentSolution?.filter((a) => a.ubicacion !== 'Campus').length || 0;
  const labCount = currentSolution?.filter((a) => a.tipo === 'laboratorio').length || 0;

  return (
    <main className="container py-4">
      <h1 className="mb-4 text-center">
        <i className="fas fa-school"></i> OptimAulas UNS
      </h1>

      <TutorialSteps />

      <DownloadTemplates onDownload={handleDownloadTemplates} />

      <UploadForm
        onFilesSelected={handleFilesSelected}
        onUpload={handleUpload}
        loading={loading}
        disabled={!cursosFile || !aulasFile}
        cursosFileName={cursosFileName}
        aulasFileName={aulasFileName}
      />

      {currentSolution && (
        <>
          <div className="mb-4 text-center">
            <button className="btn btn-success btn-lg" onClick={handleDownloadResults}>
              <i className="fas fa-file-download"></i> Descargar Resultados
            </button>
          </div>
          <Results assignments={currentSolution} statistics={statistics} />
          <Analysis
            fitnessHistory={statistics.fitness_history}
            campusCount={campusCount}
            externalCount={externalCount}
            labCount={labCount}
          />
        </>
      )}
    </main>
  );
}
