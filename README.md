# task-board

task-board is a tool for managing tasks and analyzing the duration of each task.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Linux environment
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Building
Make win build

```
npm run electron:build:win
```

Make mac build

```
npm run electron:build:mac
```

Make linux build

```
npm run electron:build:linux
```

Make all platform build

```
GH_TOKEN=<SECRET_TOKEN> npm run electron:build
```
---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](https://opensource.org/licenses/MIT)**
- Copyright © 2020-present, Michał Szyma