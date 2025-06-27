import { generate } from './colorGenerate';
import { writeFileSync } from 'fs';

const presetPrimaryColors: Record<string, string> = {
  green: '#52C41A',
  red: '#F5222D',
  blue: '#1677FF',
  orange: '#FA8C16',
  yellow: '#FADB14',
  purple: '#722ED1',
};

// 灰色色值写死
const grey = [
  '#ffffff',
  '#fafafa',
  '#f5f5f5',
  '#f0f0f0',
  '#d9d9d9',
  '#bfbfbf',
  '#8c8c8c',
  '#595959',
  '#434343',
  '#262626',
];

const re = {};
Object.keys(presetPrimaryColors).forEach((k) => {
  re[k] = generate(presetPrimaryColors[k]);
});
re['grey'] = grey;

// 生成SCSS变量内容
let scssContent = '';
Object.keys(re).forEach((colorName) => {
  if (colorName === 'grey') {
    re[colorName].forEach((color, index) => {
      scssContent += `$color-${colorName}-${index + 1}: ${color};\n`;
    });
  } else {
    re[colorName].forEach((color, index) => {
      scssContent += `$color-${colorName}-${index + 1}: ${color};\n`;
    });
  }
});

// 写入colors.scss文件
writeFileSync(
  './src/styles/colors.scss',
  scssContent,
  { encoding: 'utf-8' }
);
