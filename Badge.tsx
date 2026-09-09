'use client';

import React from 'react';
import styles from './styles.module.css';

interface BadgeProps {
  name: string;
  emoji: string;
}

export default function Badge({ name, emoji }: BadgeProps) {
  return (
    <div className={styles.badgeItem}>
      <span className={styles.badgeEmoji}>{emoji}</span>
      <p className={styles.badgeName}>{name}</p>
    </div>
  );
}
