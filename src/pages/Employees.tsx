import { useState } from 'react';
import Icon from '@/components/ui/icon';

const employees = [
  { id: 1, name: 'Петров Иван Васильевич', tab: '001234', role: 'Водитель', category: 'Д', route: '№ 14А', shift: '06:00–18:00', status: 'active', phone: '+7 (916) 123-45-67' },
  { id: 2, name: 'Иванов Сергей Петрович', tab: '001235', role: 'Водитель', category: 'Д', route: '№ 7', shift: '06:00–18:00', status: 'active', phone: '+7 (916) 234-56-78' },
  { id: 3, name: 'Козлов Дмитрий Николаевич', tab: '001236', role: 'Водитель', category: 'Д', route: '№ 3', shift: '07:00–19:00', status: 'active', phone: '+7 (916) 345-67-89' },
  { id: 4, name: 'Морозов Алексей Сергеевич', tab: '001237', role: 'Водитель', category: 'Д', route: '№ 9', shift: '07:00–19:00', status: 'warn', phone: '+7 (916) 456-78-90' },
  { id: 5, name: 'Сидоров Виктор Константинович', tab: '001238', role: 'Водитель', category: 'Д', route: '—', shift: '—', status: 'off', phone: '+7 (916) 567-89-01' },
  { id: 6, name: 'Новикова Елена Андреевна', tab: '001239', role: 'Диспетчер', category: '—', route: '—', shift: '08:00–20:00', status: 'active', phone: '+7 (916) 678-90-12' },
  { id: 7, name: 'Фёдоров Павел Игоревич', tab: '001240', role: 'Механик', category: '—', route: '—', shift: '07:00–15:00', status: 'active', phone: '+7 (916) 789-01-23' },
  { id: 8, name: 'Смирнова Ольга Викторовна', tab: '001241', role: 'Водитель', category: 'Д', route: '—', shift: '—', status: 'vacation', phone: '+7 (916) 890-12-34' },
];

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
                        {e.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
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
                    <span className={statusMap[e.status].cls}>{statusMap[e.status].label}</span>
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

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-30" />
            Ничего не найдено
          </div>
        )}
      </div>
    </div>
  );
}
