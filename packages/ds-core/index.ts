import { createInjectToken, inject, provide } from './ctx';
import { Component } from './decorators/component';
import { createElement } from './jsx/createElement';
import { render } from './render';
import { computed, effect, input, model, signal } from './signal';

const Ds = {
  createElement,
  render,
};

export {
  Ds,
  Component,
  input,
  effect,
  computed,
  createInjectToken,
  provide,
  inject,
  signal,
  model,
};
