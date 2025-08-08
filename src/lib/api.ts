// src/lib/api.ts
export const API_URL = 'https://optim-aulas-981376214627.us-central1.run.app';

export async function checkBackendStatus() {
  const response = await fetch(`${API_URL}/status`);
  if (!response.ok) throw new Error('Backend no disponible');
  return await response.json();
}

export async function downloadTemplates() {
  const response = await fetch(`${API_URL}/download_templates`);
  if (!response.ok) throw new Error('No se pudieron descargar los templates');
  return await response.blob();
}

export async function uploadFiles(cursos: File, aulas: File) {
  const formData = new FormData();
  formData.append('cursos', cursos);
  formData.append('aulas', aulas);

  const response = await fetch(`${API_URL}/upload`, { method: 'POST', body: formData });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al subir archivos');
  }
  return await response.json();
}

export async function optimize() {
  const response = await fetch(`${API_URL}/optimize`, { method: 'POST' });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error en optimización');
  }
  return await response.json();
}

export async function downloadResult(solution: any[]) {
  const response = await fetch(`${API_URL}/download_result`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ solution }),
  });
  if (!response.ok) throw new Error('Error al descargar resultados');
  return await response.blob();
}
