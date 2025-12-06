import { GhostType } from '@/entities/ghost/model/types';

export const mockGhosts: GhostType[] = [
  {
    id: '1',
    image: '/Rokuro-kubi.jpg',
    name: 'Rokuro-kubi',
    threatLevel: 'Критический' as const,
    location: 'Лес Инари',
    status: 'Активен' as const,
  },
  {
    id: '2',
    image: '/Okiku.jpg',
    name: 'Okiku',
    threatLevel: 'Высокий' as const,
    location: 'Заброшенный храм',
    status: 'Активен' as const,
  },
  {
    id: '3',
    image: '/Suushi-Yurei.jpg',
    name: 'Suushi-Yurei',
    threatLevel: 'Высокий' as const,
    location: 'Гора Ёсино',
    status: 'Активен' as const,
  },
  {
    id: '4',
    image: '/Sadako-Yamamura.jpg',
    name: 'Sadako-Yamamura',
    threatLevel: 'Средний' as const,
    location: 'Гора Курама',
    status: 'Активен' as const,
  },
  {
    id: '5',
    image: '/O-Iwa.jpg',
    name: 'O-Iwa',
    threatLevel: 'Низкий' as const,
    location: 'Река Камо',
    status: 'Активен' as const,
  },
  {
    id: '6',
    image: '/Ittan-momen.jpg',
    name: 'Ittan-momen',
    threatLevel: 'Критический' as const,
    location: 'Водопад Дзёгафути',
    status: 'Активен' as const,
  },
];