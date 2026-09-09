'use client';

import React, { useState, useRef } from 'react';
import styles from './styles.module.css';

interface DragDropGameProps {
  onTaskComplete: (success: boolean) => void;
}

interface DragItem {
  id: string;
  shape: string;
  color: string;
  emoji: string;
}

interface DropZone {
  id: string;
  label: string;
  correctShapeId: string;
  emoji: string;
}

export default function DragDropGame({ onTaskComplete }: DragDropGameProps) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const dragRef = useRef<HTMLDivElement>(null);

  const dragItems: DragItem[] = [
    { id: '1', shape: 'circle', color: '#FF6B6B', emoji: '🔴' },
    { id: '2', shape: 'square', color: '#4ECDC4', emoji: '🟦' },
    { id: '3', shape: 'triangle', color: '#FFE66D', emoji: '🔺' },
  ];

  const dropZones: DropZone[] = [
    { id: 'zone-1', label: 'المربع', correctShapeId: '2', emoji: '📦' },
    { id: 'zone-2', label: 'الدائرة', correctShapeId: '1', emoji: '⭕' },
    { id: 'zone-3', label: 'المثلث', correctShapeId: '3', emoji: '△' },
  ];

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDrop = (zone: DropZone) => {
    if (draggedItem && draggedItem.id === zone.correctShapeId) {
      setMatches((prev) => {
        const next = new Set(prev);
        next.add(zone.id);
        if (next.size === dropZones.length) {
          onTaskComplete(true);
        }
        return next;
      });
      playSuccessSound();
    } else {
      playErrorSound();
    }
    setDraggedItem(null);
  };

  const playSuccessSound = () => {
    console.log('Sound: Success!');
  };

  const playErrorSound = () => {
    console.log('Sound: Try again!');
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.dragArea}>
        <h3 className={styles.areaTitle}>السحب الأشكال 👆</h3>
        <div className={styles.draggables}>
          {dragItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item)}
              className={`${styles.draggable} ${
                draggedItem?.id === item.id ? styles.dragging : ''
              }`}
              style={{ backgroundColor: item.color }}
              ref={draggedItem?.id === item.id ? dragRef : null}
            >
              <span className={styles.shapeEmoji}>{item.emoji}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dropArea}>
        <h3 className={styles.areaTitle}>ضع هنا ✋</h3>
        <div className={styles.dropZones}>
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              onDrop={() => handleDrop(zone)}
              onDragOver={(e) => e.preventDefault()}
              className={`${styles.dropZone} ${
                matches.has(zone.id) ? styles.matched : ''
              }`}
            >
              <span className={styles.zoneEmoji}>{zone.emoji}</span>
              <p className={styles.zoneLabel}>{zone.label}</p>
              {matches.has(zone.id) && (
                <span className={styles.checkmark}>✅</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
