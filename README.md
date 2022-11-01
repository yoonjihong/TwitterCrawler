<img width="100" height="100" src="https://user-images.githubusercontent.com/47561303/198845208-3d828238-4a05-44ae-8a73-06070974568f.png" />

# Twitter Crawler
Crawlee와 Playwright 스터디 용도로 개발된 트위터 트윗 크롤러입니다.    


## 구현된 기능
1. 특정 키워드와 관련된 트윗 수집
2. 트윗 수집 기간 설정
3. 수집된 트윗 상세페이지 스크린샷 기능 


## 실행방법
```
$ yarn install
$ yarn dev
```

## 결과확인
트윗 수집 결과는 `storage/datasets/default` 경로에서 확인 가능합니다.    
수집된 트윗 스크린샷은 `screenshots` 폴더에 저장됩니다.

<img width="220" alt="스크린샷 2022-10-30 오전 3 04 00" src="https://user-images.githubusercontent.com/47561303/198846470-64765fbd-9481-45c1-a2db-3d1f478f9aad.png">


## 확인된 문제점
AWS EC2 해외 IP로 테스트 시 국내 IP에서 실행했을때와 수집 트윗 개수가 다른 문제. (ex - 국내 100개, 해외 70개)
- HTML을 기준으로 데이터를 수집한 게 아니라 network response 값을 긁어온 것이기 때문에 정확하진 않지만.. 아마 국내와 해외에서 보여주는 콘텐츠가 각각 다른 것으로 추청
