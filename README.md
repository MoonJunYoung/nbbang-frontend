# Nbbnag

[https://nbbang.life/](https://nbbang.life/)

<p align="center">
  <img src="https://github.com/moonjunyoung/nbbang/assets/110980148/f5abe421-22db-4e43-9583-dbaf3ac58886" alt="nbbang_Logo">
</p>

# 프로젝트 비전

모임에서 사용된 금액을 나누어 편리하게 정산하는 웹 애플리케이션 입니다.

## 모임

정산을 진행하기 위해 첫 번쨰로 해야 할 것은 모임 생성입니다.
사용자가 모임을 생성할 때 아래 기본값으로 모임이 생성되며, 이후 모임명과 날짜를 수정할 수 있습니다.

- 기본 모임명 : 모임명을 설정해 주세요
- 기본 모임 날짜 : 모임 생성일

## 멤버

정산을 진행하기 위해 두 번쨰로 해야할 것은 멤버 추가입니다.
사용자는 모임에 함께한 멤버들의 이름을 추가해야 합니다.
모임에 최초로 추가된 멤버는 자동으로 총무로 지정이 됩니다.
총무를 다른 멤버로 변경 하고자 하면, 변경하고자 하는 멤버의 버튼을 클릭하여 수정할 수 있습니다.

### 총무

총무는 모임당 한 명만 존재할 수 있으며,
모임의 사용 금액은 총무가 관리하게 됩니다.

- 모임에서 결제한 금액이 사용한 금액보다 높은 멤버 : 총무가 해당 멤버에게 차액을 입금해야 합니다.
- 모임에서 결제한 금액이 없거나 사용한 금액보다 낮은 멤버 : 총무에게 사용 금액을 입금해야 합니다.

## 결제내역

정산을 진행하기 위해 세 번째로 해야할 것은 결제내역 추가입니다.
사용자는 모임에서 사용된 결제내역에 대한 정보 ( 결제장소, 결제금액, 결제한 멤버, 함께한 멤버들 ) 를 입력해야합니다.

## 정산

위 3가지를 입력하면 결제내역에 입력된 멤버들을 기준으로 금액이 나누어지게 되며,
멤버들이 총무에게 보내야 할 돈이 계산이 됩니다.

## 입금정보

> 입금정보 등록 서비스는 모바일에서만 가능합니다.

총무가 멤버들에게 정산금액을 입금 받을때 토스, 카카오 를 통해서 입금 받을 수 있습니다.
해당 서비스를 이용하기 위해서는 아래 두가지 정보를 등록해야합니다.

- 토스 : 계좌정보 ( 은행명, 계좌번호 )
- 카카오 : 카카오등록시에 이번에만 사용하기, 계속해서 사용하기를 선택할 수 있습니다.
- 이번에만 사용하기 : 해당 모임에서만 입력한 입금정보가 사용이 됩니다.
- 계속해서 사용하기 : 이후 생성하는 모임에 입력한 입금정보가 자동으로 등록이 됩니다.

이후 모임의 공유페이지에서 각 멤버들에게 송금 링크가 생성되고 해당 링크를 통해 편하게 입금이 가능합니다.

## 공유

정산된 모든 정보는 결과 페이지에서 확인할 수 있으며 결과 페이지는 수정이 불가합니다.
페이지의 링크를 멤버들에게 공유하는 방식으로는 아래 두 가지중에서 선택할 수 있습니다.

- 링크 공유하기
- 카카오톡으로 페이지 공유하기

### 송금링크

멤버들은 공유된 페이지에서 자신의 청구된 금액을 확인할 수 있으며, 총무가 설정한( 토스 송금 계좌, 카카오 송금 ID )를 통해 원하는 플랫폼으로 간편하게 송금을 할 수 있습니다.

## Nbbang

<p align="center">
  <img src="https://github.com/moonjunyoung/nbbang/assets/117567934/33e361d7-466a-4142-b98d-011f225e2083" alt="nbbang_Logo">
</p>

## Link

> **서비스 주소** : [https://nbbang.life/](https://nbbang.life/)

<br/>

## 개발 멤버

> **백엔드 엔지니어** : [문준영](https://github.com/moonjunyoung)<br/> > **프론트엔드 엔지니어** : [김우혁](https://github.com/WooHyucks)

<br/>

## 프로젝트 소개

**모두가 편리하게 사용할 수 있는 정산 앱**
<br/>
<br/>
모임에서 정산할 항목이 복잡한 경우의 사용하기 좋은 앱이며 모임의 참석한 멤버들이 총무에게 <br/>
편하게 돈을 보낼 수 있는 시스템이 구축되어 있습니다!
<br/>
<br/>
[상세 설명 보러가기](https://github.com/moonjunyoung/nbbang/blob/master/README.md)

<br/>

## 시작 가이드

**Requirements**
<br/>
<br/>
for building and running the application you need

- [Node.js](https://nodejs.org/en)
- [Npm](https://www.npmjs.com/)
  <br/>

**Installation**
<br/>

```bash
$ git clone https://github.com/moonjunyoung/nbbang.git
$ cd frontend
```

**Frontend**
<br/>

```bash
$ cd frontend
$ npm install
```

<br/>

## Stacks🚀

**Environment**
<br/>
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<br/>
<br/>
**Config**
<br/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
<br/>
<br/>
**Development**
<br/>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
![React](https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react)
<br/>
<br/>

## 화면 구성🖥️

|                                                                  로그인 페이지                                                                  |                                                                 메인 페이지                                                                  |
| :---------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="360" alt="로그인 페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/80d6a0b9-7326-4da9-a1a9-726f17871131"> | <img width="360" alt="메인페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/480422cd-1e41-4ed3-b53f-8054139275d6">  |
|                                                                  상세 페이지1                                                                   |                                                                 상세 페이지2                                                                 |
|  <img width="360" alt="상세페이지1" src="https://github.com/moonjunyoung/nbbang/assets/117567934/7270b180-e4bd-45a4-8aec-5733c6aec121">   | <img width="360" alt="상세페이지2" src="https://github.com/moonjunyoung/nbbang/assets/117567934/21cb2e8e-adc2-4820-8999-25fca1261bf5"> |
|                                                                   공유페이지                                                                    |                                                                                                                                              |

|<img width="277" alt="공유페이지" src="https://github.com/moonjunyoung/nbbang/assets/117567934/7e7100ae-eb68-40c3-8408-68f24c69b18a">
||

## 주요 기능📦

**⭐️로그인 기능**

- 회원가입 기능과 소셜 로그인 기능을 통해 로그인이 가능 합니다.(구글,네이버,카카오)
- 로그인 성공시 토큰을 발급 받아 쿠키에 저장하고 메인페이지로 리디렉션 됩니다.(쿠키 기한은 30일)

**⭐️메인 페이지**

- 상단 오른쪽에 로그아웃 버튼으로 로그아웃을 진행할 수 있습니다. (쿠키 삭제)
- 모임 추가하기를 통해 정산페이지로 이동할 수 있습니다.(React-Router-Dom)
- 모임 추가 후 더 보기 아이콘을 통해 이름 수정,날짜 수정,모임 삭제 기능을 사용할 수 있습니다.

**⭐️정산 페이지**

- 상단 오른쪽에 모임 정보가 있는 요소를 클릭하면 모달이 열리며 모임명과 모임 날짜를 다시 수정할 수 있습니다.
- 멤버 추가하기를 통해 멤버를 추가할 수 있으며 첫 번째 추가된 멤버가 총무로 지정됩니다.
- 총무 변경 시 멤버 이름을 클릭하여 모달이 열린 후 체크박스를 통해 변경이 가능합니다.
- 멤버를 등록 후 결제내역을 추가할 수 있으며 추가 시 결제한 사람(드롭박스)과 참석한 멤버(체크박스)를 선택할 수 있습니다.
- 결제 내역 추가를 진행하면 결제 내역과 정산 내역이 생성되며 결제 내역을 선택하여 수정이 가능합니다.(선택 시 모달이 열리며 결제 장소, 금액, 결제자, 멤버를 수정할 수 있습니다.)
- 모든 정보의 입력이 완료되면 카카오톡 공유하기와 링크 복사하기(모바일에서는 링크 공유하기)를 통해 정산 결과를 공유할 수 있습니다.
- 모바일에서는 카카오 송금, 토스 송금이 지원되며, 카카오 ID 와 토스 계좌를 등록하면 총무의 계좌 or 카카오톡으로 송금을 받을 수 있습니다.

**⭐️공유 페이지**

- 정산의 모든 정보가 표시되며 멤버들은 정보를 수정할 수 없습니다.
- 총무가 카카오 ID, 토스 계좌 등록을 하였을 시 멤버들은 카카오 입금, 토스 입금을 통해 원 클릭 입금이 가능해집니다. (모바일 한정)
