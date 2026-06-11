import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import api from '../../../api/api.js';

const obtenerEtiquetaSemana = (offsetSemanas) => {
  if (offsetSemanas === 0) return 'Esta sem.';
  if (offsetSemanas === -1) return 'Sem -1';
  if (offsetSemanas === -2) return 'Sem -2';
  if (offsetSemanas === -3) return 'Sem -3';
  return `Sem ${offsetSemanas}`;
};

const getLunesDeSemana = (fecha) => {
  const d = new Date(fecha);
  const dia = d.getDay(); // 0=domingo
  const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const TooltipPersonalizado = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const valor = payload[0]?.value || 0;
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '6px',
      padding: '10px 14px',
      fontSize: '13px',
      color: 'var(--text)',
    }}>
      <div style={{ color: 'var(--muted)', fontSize: '11px', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-head)',
        fontSize: '1.2rem',
        color: 'var(--accent2)',
      }}>
        ${valor.toLocaleString('es-UY')}
      </div>
    </div>
  );
};

export default function GraficoEarningsTaller({ usuario }) {
  const [datos, setDatos] = useState([]);
  const [totalPeriodo, setTotalPeriodo] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (usuario?._id) cargarDatos();
  }, [usuario]);

  const cargarDatos = async () => {
    setCargando(true);
    setError(null);
    try {
      const response = await api.get('/mantenimientos?page=1&limit=200');
      const todos = response.data?.data?.mantenimientos || [];

      // Filtrar solo los del taller actual
      const delTaller = todos.filter(m =>
        m.taller?._id === usuario._id || m.taller === usuario._id
      );

      // Construir las últimas 4 semanas (incluyendo la actual)
      const ahora = new Date();
      const lunesActual = getLunesDeSemana(ahora);

      const semanas = [-3, -2, -1, 0].map(offset => {
        const lunesSem = new Date(lunesActual);
        lunesSem.setDate(lunesActual.getDate() + offset * 7);
        const domenicaSem = new Date(lunesSem);
        domenicaSem.setDate(lunesSem.getDate() + 6);
        domenicaSem.setHours(23, 59, 59, 999);

        const costoSemana = delTaller
          .filter(m => {
            const fechaMant = new Date(m.fecha);
            return fechaMant >= lunesSem && fechaMant <= domenicaSem;
          })
          .reduce((acc, m) => acc + (m.costo || 0), 0);

        return {
          semana: obtenerEtiquetaSemana(offset),
          costo: costoSemana,
          esActual: offset === 0,
        };
      });

      setDatos(semanas);
      setTotalPeriodo(semanas.reduce((acc, s) => acc + s.costo, 0));
    } catch (err) {
      console.error('Error cargando earnings:', err);
      setError('No se pudieron cargar los ingresos');
    } finally {
      setCargando(false);
    }
  };

  const semanaActual = datos.find(d => d.esActual)?.costo || 0;
  const hayDatos = datos.some(d => d.costo > 0);

  if (cargando) {
    return (
      <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
        <div className="spinner" />
        <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: 12 }}>
          Cargando ingresos...
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
        <div className="card-title">Ingresos por semana</div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--muted)',
        }}>
          últimas 4 semanas
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        marginBottom: '20px',
      }}>
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '12px 16px',
          borderLeft: '3px solid var(--accent2)',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Esta semana
          </div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: 'var(--accent2)', lineHeight: 1.2 }}>
            ${semanaActual.toLocaleString('es-UY')}
          </div>
        </div>
        <div style={{
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '12px 16px',
          borderLeft: '3px solid var(--success)',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Total 4 semanas
          </div>
          <div style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', color: 'var(--success)', lineHeight: 1.2 }}>
            ${totalPeriodo.toLocaleString('es-UY')}
          </div>
        </div>
      </div>

      {!hayDatos ? (
        <div className="empty-state" style={{ padding: '32px' }}>
          <div className="empty-icon">💰</div>
          <div className="empty-text">
            No hay ingresos registrados en las últimas 4 semanas
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={datos}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="semana"
              tick={{
                fill: 'var(--muted)',
                fontSize: 11,
                fontFamily: 'var(--font-body)',
              }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: 'var(--muted)',
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`}
              width={42}
            />
            <Tooltip
              content={<TooltipPersonalizado />}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            />
            <Bar
              dataKey="costo"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            >
              {datos.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.esActual ? 'var(--accent2)' : 'var(--accent)'}
                  fillOpacity={entry.esActual ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}

      <div style={{
        display: 'flex',
        gap: '16px',
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent2)' }} />
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Semana actual</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)', opacity: 0.6 }} />
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Semanas anteriores</span>
        </div>
      </div>
    </div>
  );
}
