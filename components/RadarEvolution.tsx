import React, { useState, useEffect } from 'react';

// Helper to calculate hex points based on radius and value (0-1) for each axis
// Rotation: 0, 60, 120, 180, 240, 300 degrees (Flat top/bottom)
// Center: 100, 100
const getPoint = (angleDeg: number, radius: number, value: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    const r = radius * value;
    const x = 100 + r * Math.cos(angleRad);
    const y = 100 + r * Math.sin(angleRad);
    return `${x},${y}`;
};

const createPath = (values: number[], radius: number) => {
    // Angles for flat-bottom/top hexagon: 30, 90, 150... is POINT at bottom.
    // We want SIDE at bottom. Angles: 0, 60, 120, 180, 240, 300.
    // 0: Right
    // 60: Bottom Right
    // 120: Bottom Left (Segment 60-120 is horizontal bottom)
    // 180: Left
    // 240: Top Left
    // 300: Top Right
    const angles = [300, 0, 60, 120, 180, 240];

    const d = values.map((v, i) => {
        const point = getPoint(angles[i], radius, v);
        return `${i === 0 ? 'M' : 'L'} ${point}`;
    }).join(' ') + ' Z';

    return d;
};

export const RadarEvolution = () => {
    const [isImproved, setIsImproved] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsImproved(prev => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, [isImproved]);

    const handleManualToggle = (improved: boolean) => {
        setIsImproved(improved);
    };

    const MAX_RADIUS = 65;

    // Background Grids (Full 1.0 value)
    const bgPath100 = createPath([1, 1, 1, 1, 1, 1], MAX_RADIUS);
    const bgPath66 = createPath([1, 1, 1, 1, 1, 1], MAX_RADIUS * 0.66);
    const bgPath33 = createPath([1, 1, 1, 1, 1, 1], MAX_RADIUS * 0.33);

    // Data Values (0.0 - 1.0)
    // Axes: Entusiasmo, Vitalidad, Claridad, Comunicación, Seguridad, Reconocimiento

    // State A: Initial (Average/Poor)
    // Irregular profile
    const valuesA = [0.55, 0.45, 0.60, 0.35, 0.45, 0.50];
    const pathA = createPath(valuesA, MAX_RADIUS);

    // State B: Improved (Good)
    // Expanded profile
    const valuesB = [0.85, 0.90, 0.85, 0.88, 0.80, 0.92];
    const pathB = createPath(valuesB, MAX_RADIUS);

    return (
        <div className="relative w-full h-full flex flex-col justify-between">
            {/* Top Status Bar (New Location - High Visibility) */}
            <div className="flex justify-center pt-2 relative z-20 mb-[-10px]">
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200 shadow-sm transition-all duration-500">
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {isImproved ? 'Junio 2025' : 'Enero 2025'}
                    </span>
                    <div className="h-4 w-[1px] bg-slate-300"></div>
                    <span className={`text-[10px] font-bold uppercase tracking-wide transition-colors duration-500 ${isImproved ? 'text-[#65a30d]' : 'text-slate-500'}`}>
                        {isImproved ? 'Post-Intervención' : 'Diagnóstico Inicial'}
                    </span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative flex-grow h-full -mt-2">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background Grids */}
                    <path d={bgPath100} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                    <path d={bgPath66} fill="none" stroke="#e2e8f0" strokeWidth="1" />
                    <path d={bgPath33} fill="none" stroke="#e2e8f0" strokeWidth="1" />

                    {/* Animated Data Shape */}
                    <path
                        d={isImproved ? pathB : pathA}
                        className="transition-all duration-[2000ms] ease-in-out"
                        fill={isImproved ? "#dcfce7" : "#f1f5f9"}
                        fillOpacity="0.6"
                        stroke={isImproved ? "#84cc16" : "#94a3b8"}
                        strokeWidth="2"
                        style={{
                            transitionProperty: 'd, fill, stroke',
                            willChange: 'd, fill, stroke'
                        }}
                    />

                    {/* Labels - Rotated Layout with Flat Bottom */}
                    {/* 300 deg: Top Right (Entusiasmo) */}
                    <text x="145" y="45" textAnchor="start" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Entusiasmo</text>

                    {/* 0 deg: Right (Vitalidad) */}
                    <text x="175" y="102" textAnchor="start" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Vitalidad</text>

                    {/* 60 deg: Bottom Right (Claridad) */}
                    <text x="145" y="165" textAnchor="start" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Claridad</text>

                    {/* 120 deg: Bottom Left (Comunicación) */}
                    <text x="55" y="165" textAnchor="end" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Comunicación</text>

                    {/* 180 deg: Left (Seguridad) */}
                    <text x="25" y="102" textAnchor="end" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Seguridad</text>

                    {/* 240 deg: Top Left (Reconocimiento) */}
                    <text x="55" y="45" textAnchor="end" fontSize="5" className="fill-[#141414] font-semibold uppercase tracking-widest font-sans">Reconocimiento</text>

                </svg>
            </div>

            {/* Bottom Controls (Dots Only) */}
            <div className="flex justify-center pb-2 relative z-20 -mt-4">
                <div className="flex gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-slate-100/50 backdrop-blur-sm">
                    <button
                        onClick={() => handleManualToggle(false)}
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${!isImproved ? 'bg-slate-800 w-4' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label="Ver estado inicial"
                    />
                    <button
                        onClick={() => handleManualToggle(true)}
                        className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${isImproved ? 'bg-[#65a30d] w-4' : 'bg-slate-300 hover:bg-slate-400'}`}
                        aria-label="Ver estado mejorado"
                    />
                </div>
            </div>
        </div>
    );
};
