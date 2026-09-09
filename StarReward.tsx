'use client';

import React from 'react';
import Badge from './Badge';
import styles from './styles.module.css';

interface StarRewardProps {
  totalStars: number;
  badges: string[];
}

export default function StarReward({ totalStars, badges }: StarRewardProps) {
  const getBadgeInfo = (badgeId: string) => {
    const badgeMap: Record<string, { name: string; emoji: string }> = {
      'lesson-master': { name: 'معلم الدروس', emoji: '🏆' },
      'star-collector': { name: 'جامع النجوم', emoji: '⭐' },
      'quick-learner': { name: 'المتعلم السريع', emoji: '⚡' },
    };
    return badgeMap[badgeId] || { name: 'شارة', emoji: '🎖️' };
  };

  return (
    <div className={styles.rewardContainer}>
      <div className={styles.starsSection}>
        <h3 className={styles.sectionTitle}>النجوم</h3>
        <div className={styles.starDisplay}>
          <span className={styles.starCount}>{totalStars}</span>
          <span className={styles.starIcon}>⭐</span>
        </div>
        <p className={styles.starMessage}>
          {totalStars < 10 && 'استمر في التعلم!'}
          {totalStars >= 10 && totalStars < 30 && 'أداء ممتاز!'}
          {totalStars >= 30 && 'أنت نجم!'}
        </p>
      </div>

      <div className={styles.badgesSection}>
        <h3 className={styles.sectionTitle}>الشارات</h3>
        <div className={styles.badgesList}>
          {badges.length > 0 ? (
            badges.map((badge) => {
              const info = getBadgeInfo(badge);
              return <Badge key={badge} name={info.name} emoji={info.emoji} />;
            })
          ) : (
            <p className={styles.emptyMessage}>لم تكسب شارات بعد</p>
          )}
        </div>
      </div>
    </div>
  );
}
