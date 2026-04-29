import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GraficoDesempenho = ({ dados }) => (
  <div style={{ width: '100%', height: '300px', background: '#fff', padding: '20px', borderRadius: '12px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={dados}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="performance" 
          stroke="#2980b9" 
          strokeWidth={3} 
          dot={{ r: 6 }} 
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default GraficoDesempenho;