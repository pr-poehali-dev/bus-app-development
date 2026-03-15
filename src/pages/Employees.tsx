import { useState } from 'react';
import Icon from '@/components/ui/icon';

const employees: {
  id: number; name: string; tab: string; role: string;
  category: string; route: string; shift: string; status: string; phone: string;
}[] = [];

const statusMap: Record<string, { label: string; cls: string }> = {
  active: { label: 'На маршруте', cls: 'badge-green' },
  warn: { label: 'Опоздание', cls: 'badge-orange' },
  off: { label: 'Снят с маршрута', cls: 'badge-red' },
  vacation: { label: 'Отпуск', cls: 'badge-blue' },
};

export default function Employees() {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.tab.includes(search);
    const matchRole = !filterRole || e.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Сотрудники</h2>
          <p className="text-sm text-muted-foreground">Всего {employees.length} сотрудников</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white"
          style={{ background: 'hsl(var(--primary))' }}
        >
          <Icon name="UserPlus" size={15} />
          Добавить
        </button>
      </div>

      <div className="bg-white border border-border rounded-lg overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div className="px-5 py-3 border-b border-border flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по имени или табельному..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-2 text-sm border border-border rounded outline-none focus:border-primary"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded outline-none focus:border-primary bg-white"
          >
            <option value="">Все должности</option>
            <option value="Водитель">Водитель</option>
            <option value="Диспетчер">Диспетчер</option>
            <option value="Механик">Механик</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Icon name="Users" size={40} className="mx-auto mb-3" style={{ color: 'hsl(140 15% 80%)' }} />
            <p className="text-sm text-muted-foreground font-medium">Сотрудники не добавлены</p>
            <p className="text-xs mt-1" style={{ color: 'hsl(140 15% 65%)' }}>Нажмите «Добавить», чтобы внести первого сотрудника</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>ФИО</th>
                  <th>Таб. №</th>
                  <th>Должность</th>
                  <th>Категория</th>
                  <th>Маршрут</th>
                  <th>Смена</th>
                  <th>Телефон</th>
                  <th>Статус</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'hsl(var(--primary))' }}>
                          {e.name.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                        </div>
                        <span className="font-medium text-sm">{e.name}</span>
                      </div>
                    </td>
                    <td className="font-mono-ibm text-xs text-muted-foreground">{e.tab}</td>
                    <td>{e.role}</td>
                    <td className="font-semibold">{e.category}</td>
                    <td className="font-medium">{e.route}</td>
                    <td className="font-mono-ibm text-xs">{e.shift}</td>
                    <td className="text-xs">{e.phone}</td>
                    <td>
                      <span className={statusMap[e.status]?.cls ?? 'badge-blue'}>{statusMap[e.status]?.label ?? e.status}</span>
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
        )}
      </div>
    </div>
  );
}
