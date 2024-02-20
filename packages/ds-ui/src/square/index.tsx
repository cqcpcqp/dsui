import { Component } from 'ds-core/decorators/component';

import React from 'react';
import style from './index.scss';

@Component({ select: 'ds-square', style })
class Square {
  title = '';

  content = '';

  tips = '';

  desc = '';

  a: {
    someProperty: string;
  } = {
    someProperty: 'someValue',
  };

  render() {
    return (
      <div className="card-container">
        <div className="title">{this.title}</div>
        <div className="card-body">
          <slot name="content">
            <div className="content">{this.content}</div>
          </slot>
          <div className="tips">{this.tips}</div>
        </div>
        <slot name="desc">
          <div className="desc">{this.desc}</div>
        </slot>
      </div>
    );
  }
}

export default Square;
