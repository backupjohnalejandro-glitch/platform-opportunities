'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  {
    icon: '🔭',
    title: '¡Bienvenido a OppScan!',
    body: 'OppScan es tu radar de oportunidades de negocio. Escanea automáticamente internet en busca de tendencias, eventos, conferencias y brechas de mercado para ayudarte a descubrir tu próxima gran idea de aplicación o negocio.',
  },
  {
    icon: '⚡',
    title: 'Dashboard',
    body: 'El Dashboard es tu vista principal. Aquí verás un resumen de las oportunidades más relevantes, estadísticas generales, las oportunidades más "calientes" del momento y los próximos eventos importantes.',
  },
  {
    icon: '🎯',
    title: 'Oportunidades',
    body: 'En Opportunities puedes explorar todas las oportunidades detectadas. Filtra por categoría (tendencias, eventos, conferencias, herramientas...), ordénalas por relevancia y guarda las que más te interesen marcándolas con la estrella ⭐.',
  },
  {
    icon: '📅',
    title: 'Timeline',
    body: 'La sección Timeline muestra un calendario con todos los eventos y conferencias próximas. Úsala para planificar en qué momento lanzar tu producto o en qué eventos participar para conectar con tu mercado objetivo.',
  },
  {
    icon: '⚙️',
    title: 'Configuración y Escaneo',
    body: 'En Settings configura tus fuentes de datos (Hacker News, GitHub, Dev.to) y las palabras clave que más te interesan. Luego pulsa el botón Scan para que OppScan rastree internet y traiga nuevas oportunidades en tiempo real.',
  },
  {
    icon: '🚀',
    title: '¡Todo listo!',
    body: 'Ya conoces OppScan. Empieza configurando tus palabras clave en Settings y lanza tu primer escaneo. Si en algún momento quieres volver a ver este tutorial, pulsa el botón "Ver tutorial" en la barra lateral.',
  },
];

export default function Tutorial() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem('oppscan_tutorial_seen');
    if (!seen) setOpen(true);

    const handler = () => {
      setStep(0);
      setOpen(true);
    };
    window.addEventListener('open-tutorial', handler);
    return () => window.removeEventListener('open-tutorial', handler);
  }, []);

  function close() {
    localStorage.setItem('oppscan_tutorial_seen', '1');
    setOpen(false);
  }

  function next() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      close();
    }
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  if (!open) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-widest">
              Tutorial — Paso {step + 1} de {STEPS.length}
            </span>
            <button
              onClick={close}
              className="text-slate-500 hover:text-slate-300 transition-colors text-lg leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          {/* Step indicator dots */}
          <div className="flex gap-1.5 mb-6">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? 'w-6 bg-indigo-500'
                    : i < step
                    ? 'w-1.5 bg-indigo-800'
                    : 'w-1.5 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-4xl mb-4">
              {current.icon}
            </div>
            <h2 className="text-white font-bold text-xl mb-3">{current.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{current.body}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
          <button
            onClick={prev}
            disabled={step === 0}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Anterior
          </button>

          <button
            onClick={close}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
          >
            Saltar tutorial
          </button>

          <button
            onClick={next}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {isLast ? '¡Empezar! 🚀' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  );
}
