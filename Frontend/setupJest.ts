import 'jest-preset-angular/setup-jest';
import $ from 'jquery';

Object.defineProperty(window, '$', {value: $});
Object.defineProperty(global, '$', {value: $});
Object.defineProperty(global, 'jQuery', {value: $});
