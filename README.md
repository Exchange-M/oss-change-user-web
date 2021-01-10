# 거래소 프론트 - 사용자

## 설정파일

* **`.env`**

.env는 연결될 API 서버와 소켓 정보를 작성한다.

```
REACT_APP_PRODUCTION_MODE=develop
```

```
REACT_APP_PRODUCTION_MODE=production
```

* `./src/config/config.json`

```json
{
  "develop": {
    "API": {
      "IP": "http://127.0.0.1",
      "PORT": "3000"
    },
    "SOCKET": {
      "IP": "127.0.0.1",
      "PORT": "3002"
    }
  }, 
  "production": {
    "API": {
      "IP": "http://127.0.0.1",
      "PORT": "3000"
    },
    "SOCKET": {
      "IP": "127.0.0.1",
      "PORT": "3002"
    }
  } 
}
```

.env에 명시한 정보로 연결한다.

## start 

```sh
$ npm run start
```

## build

```sh
$ npm run build
```

## storybook

```sh
$ npm run storybook
```

[CRA에 storybook 설정하는 방법](https://blog.naver.com/pjt3591oo/221884827235)