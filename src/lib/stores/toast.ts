import { writable } from 'svelte/store';

const defaults = {
  duration: 1000,
};

const createToast = () => {
  const { subscribe, update } = writable([]);
  let count = 0;
  const _obj = obj => obj instanceof Object;
  const push = (msg, opts = {}) => {
    const param = { target: 'default', ...(_obj(msg) ? msg : { ...opts, msg }) };
    const entry = {
      ...defaults,
      ...param,
      id: ++count,
    };
    update(n => [entry, ...n]);
    return count;
  };
  const pop = id => {
    update(n => {
      if (!n.length || id === 0) return [];
      if (_obj(id)) return n.filter(i => id(i));
      const target = id || Math.max(...n.map(i => i.id));
      return n.filter(i => i.id !== target);
    });
  };
  const set = (id, opts = {}) => {
    const param = _obj(id) ? { ...id } : { ...opts, id };
    update(n => {
      const idx = n.findIndex(i => i.id === param.id);
      if (idx > -1) {
        n[idx] = { ...n[idx], ...param };
      }
      return n;
    });
  };
  return { subscribe, push, pop, set };
};

export const toast = createToast();
