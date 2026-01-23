"use client";

import React from 'react';
// @ts-ignore
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel"
}: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.7)',
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(5px)'
            }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-panel"
                    style={{
                        background: '#1a1a1a',
                        border: '1px solid #333',
                        padding: '2rem',
                        borderRadius: '16px',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}
                >
                    <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem', color: '#fff' }}>{title}</h3>
                    <p style={{ marginBottom: '2rem', color: '#aaa', lineHeight: '1.5' }}>{message}</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={onCancel}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                border: '1px solid #444',
                                background: 'transparent',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'var(--primary, #d946ef)',
                                color: '#000',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {confirmText}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
