# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/OlegMikhailov23/nodejs2021Q4-service.git
```

## Start with Docker

 - download docker https://docs.docker.com/engine/install/ (if it necessary);
 - create account here https://hub.docker.com/ (if it necessary);
 - run:
 ```
 $ docker-compose up
```

## Start DB in synchronize mode
 - add to orm config property `synchronize: true`
 
## Start DB in migration mode
 - start docker container;
 - in cli type:
 ```docker exec -i -t <continer id> sh```
 - run:
 ```npm run typeorm:createmig```
 - for running migration: 
 ```npm run typeorm:runmig```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

## Running application in production mode

```
npm run start:prod
```

## Build dist

```
npm run build:ts
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Stress tests

# Express
|                     |                       |                                                                |
|---------------------|-----------------------|----------------------------------------------------------------|
| Checks              | total                 | 36540                                                          |
| Duration            | total                 | 24min                                                          |
| http_req_blocked    | [avg, min, med, max]  | avg=14.56µs min=0s med=5µs max=9.16ms                          |
| http_req_connecting | [avg, min, med, max]  | avg=3.62µs min=0s med=0s max=1.81ms                            |
| http_req_duration   | [avg, min, med, max]  | avg=10.28s min=1.91ms med=9.18s max=36.54s                     |
| http_req_failed     | total                 | 0%                                                             |
| http_req_receiving  | [avg, min, med, max]  | avg=13.16ms  min=10µs med=182µs  max=1.27s                     |
| http_req_sending    | [avg, min, med, max]  | avg=776.22µs min=4µs med=32µs max=691.07ms                     |
| http_req_waiting    | [avg, min, med, max]  | avg=10.27s   min=1.81ms   med=9.16s  max=36.54s                |
| http_reqs           | total                 | 37116   (25.751285/s)                                          |
| iteration_duration  | [avg, min, med, max]  | avg=1m3s     min=369.86ms med=57.82s max=1m59s                 |
| iterations          | total                 | 6080  (4.218337/s)                                             |
| virtual users       | [min, max]            | min=2 max=400                                                  |
| virtual users max   | [min, max]            | min=400 max=400                                                |

# Fastify
|                     |                       |                                                                |
|---------------------|-----------------------|----------------------------------------------------------------|
| Checks              | total                 | 33857                                                          |
| Duration            | total                 | 24min                                                          |
| http_req_blocked    | [avg, min, med, max]  | avg=19.03µs min=0s med=5µs max=12.64ms                         |
| http_req_connecting | [avg, min, med, max]  | avg=3.67µs min=0s med=0s max=1.43ms                            |
| http_req_duration   | [avg, min, med, max]  | avg=11.12s min=1.54ms med=10.59s max=27.91s                    |
| http_req_failed     | total                 | 0% (1 req failed :( )                                           |
| http_req_receiving  | [avg, min, med, max]  | avg=15.86ms  min=12µs    med=526µs  max=1.22s                  |
| http_req_sending    | [avg, min, med, max]  | avg=847.77µs min=5µs     med=32µs   max=758.41ms               |
| http_req_waiting    | [avg, min, med, max]  | avg=11.11s   min=1.46ms  med=10.57s max=27.91s                 |
| http_reqs           | total                 | 34417  (23.887985/s)                                           |
| iteration_duration  | [avg, min, med, max]  | avg=1m8s     min=196.2ms med=1m2s   max=2m7s                   |
| iterations          | total                 | 5631 (3.908337/s)                                              |
| virtual users       | [min, max]            | min=2 max=400                                                  |
| virtual users max   | [min, max]            | min=400 max=400                                                |

Stress test done with [K6](https://k6.io/)
