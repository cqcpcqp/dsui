/**
 * 我感觉可能只能在@Component里做文章，想办法阻止vue给自定义元素设置属性
 * 然后在组件里自己去处理
 * 简单来讲就是把所有的属性都记下来？
 */

/**
 * 有的属性变更时需要去触发 render 比如value placeholder
 * 有的组件不需要 比如 size
 * 这样看 observerAttributes 没有任何存在的必要
 *
 * btw
 * v-bind:
 * vue3对自定义元素有特殊处理
 * 如果自定义元素有对应的property，Vue会优先设置property
 * 如果没有对应的property，才会会退到设置attribute
 */

import { input } from './input';
import { computed } from './computed';
import { effect } from './effect';
import { signal } from './signal';
import { model } from './model';

export { input, computed, effect, signal, model };
