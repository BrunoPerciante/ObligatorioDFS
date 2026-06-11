// IMPORTANTE: instalar recharts si no está
// npm install recharts

import { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import api from '../../../api/api.js';

// Colores que coinciden con las tags del sistema (App.css)
const COLORES_CATEGORIA = {
  'mecanica':       '#5ab4ff',   // tag-mecanica
  'electricidad':   '#f5c842',   // tag-electricidad
  'chapa y pintura':'#5ae88a',   // tag-chapa
};

const COLOR_DEFAULT = '#7a7570'; // --muted

// Tooltip personalizado con el dark theme del proyecto
const TooltipPersonalizado = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '10px 14px',
      fontSize: '13px',
      color: 'var(--text)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 4, textTransform: 'capitalize' }}>
        {item.name}
      </div>
      <div style={{ color: item.payload.color }}>
        {item.value} mantenimiento{item.value !== 1 ? 's' : ''}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '11px', marginTop: 2 }}>
        {item.payload.porcentaje}% del total
      </div>
    </div>
  );
};

// Label personalizado dentro de los segmentos
const LabelPersonalizado = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  if (value === 0) return null;
  const RADIAN = Math.PI / 180;
  const radio = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radio * Math.cos(-midAngle * RADIAN);
  const y = cy + radio * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-head)' }}
    >
      {value}
    </text>
  );
};

export default function GraficoMantenimientos({ vehiculos = [], esTaller = false }) {
  const [datos, setDatos] = useState([]);
  const [total, setTotal] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, [vehiculos.length, esTaller]);

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await api.get('/mantenimientos?page=1&limit=200');
      const todos = response.data?.data?.mantenimientos || [];

      // Si es dueño, filtrar solo los de sus vehículos
      let filtrados = todos;
      if (!esTaller && vehiculos.length > 0) {
        const idsVehiculos = vehiculos.map(v => v._id);
        filtrados = todos.filter(m => idsVehiculos.includes(m.vehiculo?._id));
      }

      // Agrupar por categoría
      const conteo = {};
      filtrados.forEach(m => {
        const nombreCat = m.categoria?.nombre || 'sin categoría';
        conteo[nombreCat] = (conteo[nombreCat] || 0) + 1;
      });

      const totalRegistros = filtrados.length;
      setTotal(totalRegistros);

      const datosFormateados = Object.entries(conteo).map(([nombre, cantidad]) => ({
        name: nombre,
        value: cantidad,
        color: COLORES_CATEGORIA[nombre] || COLOR_DEFAULT,
        porcentaje: totalRegistros > 0
          ? Math.round((cantidad / totalRegistros) * 100)
          : 0,
      }));

      setDatos(datosFormateados);
    } catch (err) {
      console.error('Error cargando datos del gráfico:', err);
      setError('No se pudieron cargar los datos');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: 12 }}>
          Cargando datos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <p style={{ color: 'var(--muted)', fontSize: '13px', textAlign: 'center', padding: '24px' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Mantenimientos por categoría</div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--muted)',
        }}>
          {total} total
        </span>
      </div>

      {total === 0 ? (
        <div className="empty-state" style={{ padding: '32px' }}>
          <div className="empty-icon">📊</div>
          <div className="empty-text">
            No hay mantenimientos registrados todavía
          </div>
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={datos}
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={40}
                dataKey="value"
                labelLine={false}
                label={LabelPersonalizado}
                strokeWidth={2}
                stroke="var(--surface)"
              >
                {datos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<TooltipPersonalizado />} />
              <Legend
                formatter={(value) => (
                  <span style={{
                    color: 'var(--text)',
                    fontSize: '12px',
                    textTransform: 'capitalize',
                    fontFamily: 'var(--font-body)',
                  }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>

          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${datos.length}, 1fr)`,
            gap: '8px',
            marginTop: '8px',
            borderTop: '1px solid var(--border)',
            paddingTop: '16px',
          }}>
            {datos.map(item => (
              <div key={item.name} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-head)',
                  fontSize: '1.6rem',
                  color: item.color,
                  lineHeight: 1,
                }}>
                  {item.porcentaje}%
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginTop: '4px',
                  textAlign: 'center',
                }}>
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
