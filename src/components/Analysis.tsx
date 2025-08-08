// src/components/Analysis.tsx
"use client";
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Props {
  fitnessHistory: number[];
  campusCount: number;
  externalCount: number;
  labCount: number;
}

export default function Analysis({ fitnessHistory, campusCount, externalCount, labCount }: Props) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: fitnessHistory.map((_, i) => i + 1),
        datasets: [
          {
            label: 'Mejor Fitness por Generación',
            data: fitnessHistory,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Evolución del Algoritmo Genético',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Generación',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Fitness',
            },
          },
        },
      },
    });
  }, [fitnessHistory]);

  return (
    <section id="analysis" className="mb-5">
      <div className="card">
        <div className="card-header">Análisis</div>
        <div className="card-body">
          <div className="row mb-4 text-center">
            <div className="col-md-4">
              <h5>Aulas en Campus</h5>
              <p className="display-6">{campusCount}</p>
            </div>
            <div className="col-md-4">
              <h5>Aulas Externas</h5>
              <p className="display-6">{externalCount}</p>
            </div>
            <div className="col-md-4">
              <h5>Laboratorios</h5>
              <p className="display-6">{labCount}</p>
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
