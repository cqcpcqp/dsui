import { describe, expect, it, vi } from 'vitest';
import { computed, effect, input, model, signal } from '../signal/index.js';
import {
  INPUT_SIGNAL_SYMBOL,
  MODEL_SIGNAL_SYMBOL,
  SIGNAL_ALIAS_SYMBOL,
  SIGNAL_SYMBOL,
} from '../signal/symbol.js';

describe('signal', () => {
  it('should create a signal with initial value', () => {
    const count = signal(0);
    expect(count()).toBe(0);
  });

  it('should update value when set is called', () => {
    const count = signal(0);
    count.set(5);
    expect(count()).toBe(5);
  });

  it('should not trigger update if value is the same', () => {
    const count = signal(0);
    const spy = vi.fn();

    effect(() => {
      spy();
      count();
    });

    expect(spy).toHaveBeenCalledTimes(1);

    count.set(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should track effects that access the signal', () => {
    const count = signal(0);
    let effectRunCount = 0;

    effect(() => {
      effectRunCount++;
      count();
    });

    expect(effectRunCount).toBe(1);

    count.set(5);
    expect(effectRunCount).toBe(2);
  });

  it('should be marked with SIGNAL_SYMBOL', () => {
    const count = signal(0);
    expect(count[SIGNAL_SYMBOL]).toBe(true);
  });
});

describe('input', () => {
  it('should create an input signal with initial value', () => {
    const value = input('test', { alias: 'value' });
    expect(value()).toBe('test');
  });

  it('should be marked with INPUT_SIGNAL_SYMBOL', () => {
    const value = input('test', { alias: 'test' });
    expect(value[INPUT_SIGNAL_SYMBOL]).toBe(true);
  });

  it('should allow external updates via set', () => {
    const value = input('initial', { alias: 'value' });
    value.set('updated');
    expect(value()).toBe('updated');
  });
});

describe('computed', () => {
  it('should create a computed signal', () => {
    const count = signal(0);
    const doubled = computed(() => count() * 2);

    expect(doubled()).toBe(0);
  });

  it('should recompute when dependencies change', () => {
    const count = signal(0);
    const doubled = computed(() => count() * 2);

    expect(doubled()).toBe(0);

    count.set(5);
    expect(doubled()).toBe(10);
  });

  it('should cache computed values', () => {
    const count = signal(0);
    let computeCount = 0;

    const doubled = computed(() => {
      computeCount++;
      return count() * 2;
    });

    expect(doubled()).toBe(0);
    expect(doubled()).toBe(0);
    expect(computeCount).toBe(1);
  });

  it('should handle multiple dependencies', () => {
    const a = signal(1);
    const b = signal(2);
    const sum = computed(() => a() + b());

    expect(sum()).toBe(3);

    a.set(5);
    expect(sum()).toBe(7);

    b.set(10);
    expect(sum()).toBe(15);
  });
});

describe('effect', () => {
  it('should run effect immediately', () => {
    let ran = false;
    effect(() => {
      ran = true;
    });
    expect(ran).toBe(true);
  });

  it('should rerun when tracked signal changes', () => {
    const count = signal(0);
    let effectCount = 0;

    effect(() => {
      effectCount++;
      count();
    });

    expect(effectCount).toBe(1);

    count.set(1);
    expect(effectCount).toBe(2);
  });

  it('should not rerun untracked signals change', () => {
    const count = signal(0);
    const name = signal('test');
    let effectCount = 0;

    effect(() => {
      effectCount++;
      count();
    });

    expect(effectCount).toBe(1);

    name.set('changed');
    expect(effectCount).toBe(1);
  });
});

describe('integration', () => {
  it('should handle complex signal graph', () => {
    const count = signal(0);
    const doubled = computed(() => count() * 2);
    const tripled = computed(() => count() * 3);
    const combined = computed(() => doubled() + tripled());

    let combinedValue;
    effect(() => {
      combinedValue = combined();
    });

    expect(combinedValue).toBe(0);

    count.set(5);
    expect(doubled()).toBe(10);
    expect(tripled()).toBe(15);
    expect(combined()).toBe(25);
    expect(combinedValue).toBe(25); // (5*2) + (5*3) = 10 + 15 = 25
  });

  it('should handle conditional dependencies', () => {
    const condition = signal(true);
    const a = signal(1);
    const b = signal(2);

    const result = computed(() => {
      return condition() ? a() : b();
    });

    expect(result()).toBe(1);

    a.set(10);
    expect(result()).toBe(10);

    condition.set(false);
    expect(result()).toBe(2);

    a.set(20);
    expect(result()).toBe(2); // Should not update when condition is false

    b.set(30);
    expect(result()).toBe(30); // Should update when condition is false
  });

  it('should handle multiple effects on same signal', () => {
    const count = signal(0);
    let effect1Count = 0;
    let effect2Count = 0;

    effect(() => {
      effect1Count++;
      count();
    });

    effect(() => {
      effect2Count++;
      count();
    });

    expect(effect1Count).toBe(1);
    expect(effect2Count).toBe(1);

    count.set(1);
    expect(effect1Count).toBe(2);
    expect(effect2Count).toBe(2);
  });
});

describe('signal advanced features', () => {
  it('should handle undefined as initial value', () => {
    const value = signal(undefined);
    expect(value()).toBe(undefined);

    value.set('defined');
    expect(value()).toBe('defined');
  });

  it('should handle null as initial value', () => {
    const value = signal(null);
    expect(value()).toBe(null);

    value.set(0);
    expect(value()).toBe(0);
  });

  it('should handle complex objects', () => {
    const obj = signal({ a: 1, b: { c: 2 } });
    expect(obj()).toEqual({ a: 1, b: { c: 2 } });

    obj.set({ a: 3, b: { c: 4 } });
    expect(obj()).toEqual({ a: 3, b: { c: 4 } });
  });

  it('should handle arrays', () => {
    const arr = signal([1, 2, 3]);
    expect(arr()).toEqual([1, 2, 3]);

    arr.set([4, 5, 6]);
    expect(arr()).toEqual([4, 5, 6]);
  });

  it('should not trigger when setting same complex object', () => {
    const obj = signal({ a: 1 });
    const spy = vi.fn();

    effect(() => {
      spy();
      obj();
    });

    expect(spy).toHaveBeenCalledTimes(1);

    // Same object reference
    const sameObj = obj();
    obj.set(sameObj);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handle rapid updates efficiently', () => {
    const count = signal(0);
    let effectRunCount = 0;

    effect(() => {
      effectRunCount++;
      count();
    });

    const initialCount = effectRunCount;

    for (let i = 1; i <= 100; i++) {
      count.set(i);
    }

    expect(effectRunCount).toBe(initialCount + 100);
  });
});

describe('input with alias', () => {
  it('should create input with alias', () => {
    const value = input('test', { alias: 'myValue' });
    expect(value()).toBe('test');
    expect(value[INPUT_SIGNAL_SYMBOL]).toBe(true);
    expect(value[SIGNAL_ALIAS_SYMBOL]).toBe('myValue');
  });

  it('should allow updating via set', () => {
    const value = input('initial', { alias: 'value' });
    value.set('updated');
    expect(value()).toBe('updated');
  });

  it('should track effects correctly', () => {
    const value = input(0, { alias: 'count' });
    let effectRunCount = 0;

    effect(() => {
      effectRunCount++;
      value();
    });

    expect(effectRunCount).toBe(1);

    value.set(5);
    expect(effectRunCount).toBe(2);
    expect(value()).toBe(5);
  });

  it('should handle alias in component context', () => {
    const mockElement = {
      value: input('initial', { alias: 'value' }),
    };

    expect(mockElement.value[INPUT_SIGNAL_SYMBOL]).toBe(true);
    expect(mockElement.value[SIGNAL_ALIAS_SYMBOL]).toBe('value');
  });
});

describe('computed edge cases', () => {
  it('should handle deeply nested computed signals', () => {
    const a = signal(1);
    const b = computed(() => a() * 2);
    const c = computed(() => b() + 3);
    const d = computed(() => c() * 4);

    expect(d()).toBe((1 * 2 + 3) * 4); // (1*2+3)*4 = 20

    a.set(2);
    expect(d()).toBe((2 * 2 + 3) * 4); // (2*2+3)*4 = 28
  });

  it('should handle computed with no dependencies', () => {
    const staticValue = computed(() => 42);
    expect(staticValue()).toBe(42);
    expect(staticValue()).toBe(42); // Should cache
  });

  it('should handle computed that depends on multiple signals', () => {
    const a = signal(1);
    const b = signal(2);
    const c = signal(3);
    const sum = computed(() => a() + b() + c());

    expect(sum()).toBe(6);

    a.set(10);
    expect(sum()).toBe(15);

    b.set(20);
    expect(sum()).toBe(33);

    c.set(30);
    expect(sum()).toBe(60);
  });
});

describe('performance and edge cases', () => {
  it('should handle multiple rapid same value updates', () => {
    const count = signal(0);
    let effectRunCount = 0;

    effect(() => {
      effectRunCount++;
      count();
    });

    const initialCount = effectRunCount;

    for (let i = 0; i < 100; i++) {
      count.set(0); // Same value
    }

    expect(effectRunCount).toBe(initialCount); // Should not trigger any updates
  });

  it('should handle circular dependencies gracefully', () => {
    const a = signal(1);
    let errorThrown = false;

    try {
      const b = computed(() => {
        // This would create a circular dependency if we tried
        // For now, just test that it doesn't break
        return a() * 2;
      });
      expect(b()).toBe(2);
    } catch (error) {
      errorThrown = true;
    }

    expect(errorThrown).toBe(false);
  });
});

describe('model basic functionality', () => {
  it('should create a model with initial value', () => {
    const count = model(0);
    expect(count()).toBe(0);
    expect(count[MODEL_SIGNAL_SYMBOL]).toBe(true);
  });

  it('should allow updates via set', () => {
    const value = model('initial');
    value.set('updated');
    expect(value()).toBe('updated');
  });

  it('should not trigger update for same value', () => {
    const count = model(0);
    const spy = vi.fn();

    effect(() => {
      spy();
      count();
    });

    expect(spy).toHaveBeenCalledTimes(1);

    count.set(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('model with alias', () => {
  it('should create model with alias', () => {
    const value = model('test', { alias: 'myValue' });
    expect(value[SIGNAL_ALIAS_SYMBOL]).toBe('myValue');
  });

  it('should handle DEFAULT_BINDING_KEY when no alias', () => {
    const value = model('test');
    expect(value[SIGNAL_ALIAS_SYMBOL]).toBeUndefined();
  });
});

describe('signal composition patterns', () => {
  it('should work with the todo list pattern', () => {
    interface Todo {
      id: number;
      text: string;
      completed: boolean;
    }

    const todos = signal([]);
    let nextId = 0;

    const addTodo = (text: string) => {
      todos.set([...todos(), { id: nextId++, text, completed: false }]);
    };

    const toggleTodo = (id: number) => {
      todos.set(
        todos().map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
      );
    };

    const completedCount = computed(() => todos().filter((todo) => todo.completed).length);

    const totalCount = computed(() => todos().length);

    expect(completedCount()).toBe(0);
    expect(totalCount()).toBe(0);

    addTodo('Learn signals');
    addTodo('Build app');

    expect(totalCount()).toBe(2);

    toggleTodo(0);
    expect(completedCount()).toBe(1);
  });

  it('should work with the counter pattern', () => {
    const count = signal(0);
    const isEven = computed(() => count() % 2 === 0);
    const isPositive = computed(() => count() > 0);

    expect(isEven()).toBe(true);
    expect(isPositive()).toBe(false);

    count.set(1);
    expect(isEven()).toBe(false);
    expect(isPositive()).toBe(true);

    count.set(-2);
    expect(isEven()).toBe(true);
    expect(isPositive()).toBe(false);
  });
});
