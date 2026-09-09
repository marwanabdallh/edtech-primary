'use client';

import React from 'react';
import styles from './styles.module.css';

interface HeaderProps {
  totalStars: number;
  badgesCount: number;
}

export default function Header({ totalStars, badgesCount }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>🎓 أكاديمية التعلم</div>
      <div className={styles.stats} aria-label="إحصائيات الطالب">
        <span>⭐ {totalStars}</span>
        <span>🏅 {badgesCount}</span>
      </div>
    </header>
  );
}
