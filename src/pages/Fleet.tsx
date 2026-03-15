import { useState } from 'react';
import Icon from '@/components/ui/icon';

const fleet = [
  { id: 1, reg: 'АА 123 77', model: 'ЛиАЗ-5292.65', year: 2019, capacity: 100, mileage: '182 450', status: 'active', route: '№ 14А', driver: 'Петров И.В.', lastTo: '15.02.2024' },
  { id: 2, reg: 'АВ 456 77', model: 'МАЗ-203.069', year: 2020, capacity: 90, mileage: '143 210', status: 'active', route: '№ 7', driver: 'Иванов С.П.', lastTo: '10.03.2024' },
  { id: 3, reg: 'АМ 789 77', model: 'ЛиАЗ-5292.65', year: 2018, capacity: 100, mileage: '224 780', status: 'repair', route: '—', driver: '—', lastTo: '01.03.2024' },
  { id: 4, reg: 'АО 321 77', model: 'НЕФАЗ-5299', year: 2021, capacity: 112, mileage: '98 340', status: 'active', route: '№ 3', driver: 'Козлов Д.Н.', lastTo: '20.02.2024' },
  { id: 5, reg: 'АП 654 77', model: 'Volgabus 5270', year: 2022, capacity: 88, mileage: '54 120', status: 'active', route: '№ 9', driver: 'Морозов А.С.', lastTo: '05.03.2024' },
  { id: 6, reg: 'АР 987 77', model: 'ЛиАЗ-6213', year: 2017, capacity: 120, mileage: '298 560', status: 'to', route: '—', driver: '—', lastTo: '12.03.2024' },
  { id: 7, reg: 'АС 111 77', model: 'МАЗ-203.069', year: 2020, capacity: 90, mileage: '156 890', status: 'active', route: '№ 22Б', driver: 'Фокин В.А.', lastTo: '01.02.2024' },
  { id: 8, reg: 'АТ 222 77', model: 'НЕФАЗ-5299', year: 2019, capacity: 112, mileage: '201 340', status: 'park', route: '—', driver: '—', lastTo: '28.02.2024' },
];

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

  const counts = {
    total: fleet.length,
    active: fleet.filter(v => v.status === 'active').length,
    repair: fleet.filter(v => v.status === 'repair').length,
    to: fleet.filter(v => v.status === 'to').length,
    park: fleet.filter(v => v.status === 'park').length,
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Подвижной состав</h2>
          <p className="text-sm text-muted-foreground">Всего {counts.total} единиц техники</p>
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
          { label: 'На маршруте', value: counts.active, color: 'hsl(142 71% 35%)', bg: 'hsl(142 71% 95%)' },
          { label: 'В парке', value: counts.park, color: 'hsl(213 78% 35%)', bg: 'hsl(213 78% 95%)' },
          { label: 'На ТО', value: counts.to, color: 'hsl(32 85% 40%)', bg: 'hsl(32 85% 95%)' },
          { label: 'Неисправны', value: counts.repair, color: 'hsl(0 72% 45%)', bg: 'hsl(0 72% 95%)' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-border rounded-lg px-4 py-3 flex items-center gap-3" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
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
                  <td>
                    <span className="font-mono-ibm font-semibold text-sm">{v.reg}</span>
                  </td>
                  <td>{v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.capacity} чел.</td>
                  <td className="font-mono-ibm text-xs">{v.mileage}</td>
                  <td className="font-medium">{v.route}</td>
                  <td className="text-sm">{v.driver}</td>
                  <td className="font-mono-ibm text-xs text-muted-foreground">{v.lastTo}</td>
                  <td>
                    <span className={statusMap[v.status].cls}>{statusMap[v.status].label}</span>
                  </td>
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
      </div>
    </div>
  );
}
