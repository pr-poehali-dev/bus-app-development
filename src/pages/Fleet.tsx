import { useState } from 'react';
import Icon from '@/components/ui/icon';

const fleet: {
  id: number; reg: string; model: string; year: number;
  capacity: number; mileage: string; status: string;
  route: string; driver: string; lastTo: string;
}[] = [];

const statusMap: Record<string, { label: string; cls: string }> = {
  active: { label: 'На маршруте', cls: 'badge-green' },
  repair: { label: 'Тех. неисправность', cls: 'badge-red' },
  to: { label: 'На ТО', cls: 'badge-orange' },
  park: { label: 'В парке', cls: 'badge-blue' },
};

export default function Fleet() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = fleet.filter((v) => {
    const matchSearch = v.reg.toLowerCase().includes(search.toLowerCase()) || v.model.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || v.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Подвижной состав</h2>
          <p className="text-sm text-muted-foreground">Всего {fleet.length} единиц техники</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <Icon name="Plus" size={15} />
          Добавить ТС
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'На маршруте', value: 0, color: 'hsl(142 71% 35%)', bg: 'white' },
          { label: 'В парке', value: 0, color: 'hsl(213 78% 35%)', bg: 'white' },
          { label: 'На ТО', value: 0, color: 'hsl(38 90% 40%)', bg: 'white' },
          { label: 'Неисправны', value: 0, color: 'hsl(0 72% 45%)', bg: 'white' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-lg px-4 py-3 flex items-center gap-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="text-2xl font-bold" style={{ color: 'hsl(140 15% 75%)' }}>0</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Госномер или модель..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-sm border border-border rounded outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded outline-none focus:border-primary bg-white"
          >
            <option value="">Все статусы</option>
            <option value="active">На маршруте</option>
            <option value="park">В парке</option>
            <option value="to">На ТО</option>
            <option value="repair">Неисправны</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Icon name="Bus" size={40} className="mx-auto mb-3" style={{ color: 'hsl(140 15% 80%)' }} />
            <p className="text-sm text-muted-foreground font-medium">Транспортные средства не добавлены</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 65%)' }}>Нажмите «Добавить ТС», чтобы внести первый автобус</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Госномер</th>
                  <th>Модель</th>
                  <th>Год</th>
                  <th>Вместимость</th>
                  <th>Пробег, км</th>
                  <th>Маршрут</th>
                  <th>Водитель</th>
                  <th>Последнее ТО</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id}>
                    <td><span className="font-mono-ibm font-semibold text-sm">{v.reg}</span></td>
                    <td>{v.model}</td>
                    <td>{v.year}</td>
                    <td>{v.capacity} чел.</td>
                    <td className="font-mono-ibm text-xs">{v.mileage}</td>
                    <td className="font-medium">{v.route}</td>
                    <td className="text-sm">{v.driver}</td>
                    <td className="font-mono-ibm text-xs text-muted-foreground">{v.lastTo}</td>
                    <td><span className={statusMap[v.status]?.cls ?? 'badge-blue'}>{statusMap[v.status]?.label ?? v.status}</span></td>
                    <td>
                      <button className="p-1.5 rounded hover:bg-muted transition-colors">
                        <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
