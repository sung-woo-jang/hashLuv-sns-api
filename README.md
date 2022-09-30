# Boss Raid system 서비스

<div align="center">
  <img src="https://img.shields.io/badge/node-16.17.0-339933?logo=node.js"> 
  <img src="https://img.shields.io/badge/NestJS-9.0.0-E0234E?logo=NestJS"> 
  <img src="https://img.shields.io/badge/TypeScript-4.4.5-3178C6?logo=typescript"> 
  <img src="https://img.shields.io/badge/Postgres-14-4479A1?logo=Postgresql"> 
  <img src="https://img.shields.io/badge/Swagger-6.1.0-DC382D?logo=swagger"> 
  <img src="https://img.shields.io/badge/TypeORM-0.3.9-010101"> 
</div>

## 소개

- > 본 서비스는 SNS입니다.
- > 사용자는 본 서비스에 접속하여, 게시물을 업로드 하거나 다른 사람의 게시물을 확인하고, 좋아요를 누를 수 있습니다.

---

| 👉 목차                        |                                                                         |
| ------------------------------ | ----------------------------------------------------------------------- |
| [1. 서비스 개요](#서비스-개요) | 서비스 기능 설명 및 고려사항                                            |
| [2. 구현 사항](#구현-사항)     | API 구현 사항 간단 설명 (자세한 정보를 원하시면 넘어가셔도 무방합니다.) |
| [3. To Do](#to-do)             | 추후 구현 예정인 기능                                                   |
| [4. ERD](#erd)                 | 서비스 ERD 모델                                                         |
| [5. Usage](#usage)             | 서비스 설치-실행 및 테스트 방법 확인                                    |
| [6. 참조 문서](#참조-문서)     | 서비스 전반적인 문서 확인                                               |

---

# 서비스 개요

- 본 서비스는 `유저 관리`, `게시판 CRRUD`, `(해시태그 포함)게시글 작성 기능`, `게시글 리스트(필터링)조회`를 제공합니다.
- 데이터 중복 최소화, 저장공간 절약, 독립성 유지를 고려해 해시태그와 게시글간 다대다 관계 설정을 하였습니다.
- 커스텀 pipe를 이용한 쿼리 파라미터 유효성검사와 데이터 형식 변환 & 기본값 설정기능을 넣어 특별한 요청값이 없어도 기능하도록 구현하였습니다.

# 구현 사항

<details>
<summary>간단 명세</summary>
<div markdown="1">

### 유저

- 유저 회원가입

  - 이메일을 ID로 사용함

- 유저 로그인 및 인증
  - JWT 토큰을 발급받으며, 이를 추후 사용자 인증으로 사용.(로그아웃은 프론트엔드에서 처리)

### 게시글

- 게시글 생성

  - 제목, 내용, 해시태그 등을 입력하여 생성합니다.

- 게시글 수정

  - 작성자만 수정 가능

- 게시글 삭제

  - 작성자만 삭제 가능
  - 삭제된 글 복구 가능

- 게시글 상세보기

  - 모든 사용자는 모든 게시물에 보기권한이 있음
  - 게시글에 좋아요를 누를 수 있음
  - 조회수 증가

- 게시글 목록

  - 모든 사용자는 모든 게시물에 보기권한이 있음
  - 제목, 해시태그, 작성일, 좋아요 수, 조회수 포함
  - 게시글 정렬 가능

    </div>

</details>

# TO DO

### 테스트 코드 작성

- API의 신뢰도를 높이기 위해 테스트 코드 구현 예정

# ERD

<img width="785" alt="스크린샷 2022-09-01 오후 10 44 18" src="https://user-images.githubusercontent.com/54757435/193230034-1a4a574a-72f0-463d-80f4-58d069694067.png">
</br>

# Usage

### Create .env file

```
MODE=dev # dev, prod
PORT=3000

# DB - postgres
USERNAME=
PASSWORD=
DATABASE=

# JWT
JWT_SECRET_KEY=
JWT_EXPIRESIN=84600000
```

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```

- API를 테스트는 Swagger를 이용해 가능합니다.
- URL: localhost:3000/docs

# 참조문서

## 📒 [노션](https://www.notion.so/SNS-72a5706078964ea7b8561aefba8b906a) - 아래의 내용을 한번에 보실 수 있습니다.

## 📒 [API 명세서](https://www.notion.so/4-API-89b65a63a31a488e951a7a723de8c840)

자세한 내용은 스웨거 페이지에서 가능하니 스웨거를 이용해주시면 매우 감사하겠습니다.🙇🏻‍♂️

## 📌 [개발 컨벤션](https://www.notion.so/2-Convention-Code-a22bd5aebcbc4116bf7d88107b13af13)
