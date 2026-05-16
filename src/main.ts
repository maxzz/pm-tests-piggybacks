import { renderNav } from './components/1-headers.ts';

import typescriptLogo from './assets/typescript.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import './nav.css';
import './style.css';

renderNav('#page-nav');

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
</section>
`;

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)