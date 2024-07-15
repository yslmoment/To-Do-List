# 프로젝트 이름

이 프로젝트는 Node.js와 MySQL을 사용한 간단한 로그인 및 회원가입 시스템입니다.

## 시작하기

### 필수 조건

- Node.js
- MySQL

### 설치

1. 이 저장소를 클론합니다:

    ```bash
    git clone https://github.com/username/project.git
    cd project
    ```

2. 필요한 패키지를 설치합니다:

    ```bash
    npm install
    ```

3. `.env` 파일을 생성하고, 다음 내용을 추가합니다:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=testdb
    ```

4. MySQL 서버를 시작하고, `testdb` 데이터베이스를 생성합니다:

    ```sql
    CREATE DATABASE testdb;
    ```

5. 서버를 시작합니다:

    ```bash
    node server.js
    ```

6. 브라우저에서 `http://localhost:3000`에 접속하여 애플리케이션을 확인합니다.

