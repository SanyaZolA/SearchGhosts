'use client';
import styles from './page.module.scss';
import { GhostCard } from '@/entities/ghost/ui/GhostCard';
import { useGhostAll, useGhostSSE } from '@/app/api/events/apiGhosts';
import { GhostType } from '@/entities/ghost/model/types';

export default function MonitoringPage() {
  const { data: ghosts = [] } = useGhostAll();
  useGhostSSE();
  return (
    <div className={styles.page}>
        <h1 className={styles.title}>Поиск духов в г.Токио</h1>
          <div className={styles.grid}>
            {ghosts.map((ghost: GhostType) => (
              <GhostCard key={ghost.id} ghost={ghost}/>
            ))}
          </div>
    </div>
  );
}
