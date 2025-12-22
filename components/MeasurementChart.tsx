import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MetricData } from '../types';

const data: MetricData[] = [
  {
    name: 'Carga Emocional',
    antes: 85,
    despues: 40,
    description: 'Tensión corporal y psíquica'
  },
  {
    name: 'Claridad',
    antes: 30,
    despues: 75,
    description: 'Capacidad de foco'
  },
  {
    name: 'Fatiga',
    antes: 80,
    despues: 35,
    description: 'Nivel de agotamiento'
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-zinc-200 shadow-xl rounded-lg text-sm">
        <p className="font-bold text-zinc-900 mb-1">{label}</p>
        <p className="text-zinc-500 mb-2 italic text-xs">{payload[0].payload.description}</p>
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500">Inicio: <span className="font-bold text-zinc-700">{payload[0].value}/100</span></span>
          <span className="text-emerald-600">Actual: <span className="font-bold">{payload[1].value}/100</span></span>
        </div>
      </div>
    );
  }
  return null;
};

export const MeasurementChart: React.FC = () => {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: -20,
            bottom: 0,
          }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#71717a', fontSize: 12, fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false}
            dy={10}
          />
          <YAxis 
            hide 
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(0,0,0,0.03)'}} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="antes" name="Medición Inicial" fill="#d4d4d8" radius={[4, 4, 0, 0]} maxBarSize={50} />
          <Bar dataKey="despues" name="Post Intervención" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};