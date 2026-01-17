/**
 * Symbol used to mark and identify signals created by the system
 * Used for type-checking and distinguishing different signal types
 */
export const SIGNAL_SYMBOL = Symbol('signal');

/**
 * Symbol used to mark and identify input signals specifically
 * Input signals are a special type of signal that can trigger component re-rendering
 */
export const INPUT_SIGNAL_SYMBOL = Symbol('input-signal');

export const MODEL_SIGNAL_SYMBOL = Symbol('model-signal');

export const SIGNAL_ALIAS_SYMBOL = Symbol('model-signal-alias');
