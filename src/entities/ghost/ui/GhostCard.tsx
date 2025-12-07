import { GhostType } from '@/entities/ghost/model/types';
import styles from './GhostCard.module.scss';
import { useCaptureGhost } from "@/app/api/events/apiGhosts";

export function GhostCard({ ghost }: { ghost: GhostType }) {
  const capture = useCaptureGhost();

  return (
    <div className={styles.card}>
      <div className={styles[ghost.status]}>{ghost.status}</div>
      <img src={ghost.image} alt={ghost.name} className={styles.image} />
      <h2>{ghost.name}</h2> 
      <div>Локация: {ghost.location}</div>
      <div>Уровень угрозы: <span
      className={`${styles[ghost.threatLevel]} ${ghost.status === 'Нейтрализован' ? styles.strikethrough : ''}`}
    >{ghost.threatLevel}</span></div>
      <button className={styles.button} disabled={ghost.status === 'Нейтрализован' || ['Низкий', 'Средний'].includes(ghost.threatLevel)} 
        onClick={() => capture.mutate(ghost.id)}>{ghost.status === 'Нейтрализован' ? 'Пойман' : 'Поймать'}
      </button>
    </div>
  );
}