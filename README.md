# AiServiceUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## nodejs 和 npm 版本
node.js =v18.16.1
npm = 9.5.1 

如果版本不对，直接用下面链接安装最新的
https://nodejs.org/en


npm install diff-match-patch-ts

git  remote set-url origin git@github.com:LiuHarry1/ai-service-ui.git

to upgrade angular to 17.x

npm install -g @angular/cli@18

ng update @angular/cli @angular/core


ng update @angular/cli@17 @angular/core@17

npm show ngx-markdown versions


npm install ngx-markdown@17


ng update @angular/cli@18 @angular/core@18


npm install primeng@17.18.15 --force

ls node_modules/primeng/table


rm -rf node_modules package-lock.json
npm cache clean --force
npm install

change below to new
import { InputTextareaModule } from 'primeng/inputtextarea';
new
import { TextareaModule } from 'primeng/textarea';

replace pInputTextarea  with pTextarea
replace [autoResize]="true" with cdkTextareaAutosize


npm install primeng @primeng/themes
