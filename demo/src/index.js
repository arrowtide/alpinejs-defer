import Alpine from 'alpinejs';
import Defer from 'alpinejs-defer';

window.Alpine = Alpine;

Alpine.directive('defer', Defer).before('ignore');

Alpine.start();
