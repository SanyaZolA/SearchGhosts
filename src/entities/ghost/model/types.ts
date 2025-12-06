export type ThreatLevel = 'Низкий' | 'Средний' | 'Высокий' | 'Критический';

export interface GhostType {
  id: string;
  name: string;
  image: string;
  location: string;
  threatLevel: ThreatLevel;
  status: 'Активен' | 'Нейтрализован';
}