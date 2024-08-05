import Alpine from 'alpinejs';
import Defer from '../../src/index.js';

window.Alpine = Alpine;

Alpine.directive('defer', Defer).before('ignore');

Alpine.start();
