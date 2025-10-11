import { render } from './render';
import { createElement } from './jsx/createElement';
import { Component } from './decorators/component';
import { input, effect } from './signal';
import { useState } from './hook';

const Didact = {
  createElement,
  useState,
  render,
};

export { Didact, Component, input, effect };
