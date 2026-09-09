'use client';

import React, { useState } from 'react';
import DragDropGame from './DragDropGame';
import styles from './styles.module.css';

interface InteractiveLessonProps {
  lessonId: number;
  onComplete: (stars: number, badge?: string) => void;
}

export default function InteractiveLesson({
  lessonId,
  onComplete,
}: InteractiveLessonProps) {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const handleTaskComplete = (success: boolean) => {
    if (success) {
      const newProgress = Math.min(progress + 33, 100);
      setProgress(newProgress);

      if (newProgress === 100) {
        setIsCompleted(true);
        setCelebrationActive(true);
        onComplete(5, 'lesson-master');
        setTimeout(() => setCelebrationActive(false), 2000);
      }
    }
  };

  return (
    <div className={styles.lessonContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>🎨 تعلم الألوان والأشكال</h1>
        <p className={styles.subtitle}>اسحب الأشكال إلى المكان الصحيح</p>
      </div>

      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
      <p className={styles.progressText}>التقدم: {progress}%</p>

      <div className={styles.content}>
        {!isCompleted ? (
          <DragDropGame onTaskComplete={handleTaskComplete} />
        ) : (
          <div className={`${styles.completionScreen} ${celebrationActive ? styles.celebrate : ''}`}>
            <div className={styles.celebration}>
              <span className={styles.emoji}>🎉</span>
              <h2 className={styles.congratulations}>ممتاز! لقد أكملت الدرس</h2>
              <p className={styles.reward}>حصلت على ⭐⭐⭐⭐⭐</p>
              <button
                className={styles.nextButton}
                onClick={() => {
                  setProgress(0);
                  setIsCompleted(false);
                }}
              >
                الدرس التالي →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
