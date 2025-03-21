import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DashboardChart = ({ data }) => {
  // Example data if none is provided
  const defaultData = [
    { name: 'Jan', value: 12 },
    { name: 'Feb', value: 19 },
    { name: 'Mar', value: 15 },
    { name: 'Apr', value: 22 },
    { name: 'May', value: 30 },
    { name: 'Jun', value: 25 },
  ];

  const chartData = data || defaultData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip 
          contentStyle={{ 
            background: '#fff', 
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        />
        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
