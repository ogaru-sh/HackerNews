# HackerNews
[HackerNewsAPI](https://github.com/HackerNews/API)から取得した
記事情報をもとに、React・Reduxを用いた記事閲覧サイトを作成

## Dependency
- Front
    - React 16.9.49
    - Redux 7.1.9
    - Next 9.5.5
    - typescript 4.0.3
- Design
    - styled-components 5.2.0
    - material-ui 4.11.0

## Setup
`git clone https://github.com/ogaru-sh/HackerNews`  
`npm install`  
`npm run build`  
`npm run start`  
`http://localhost:3000/`へアクセス

### Develop mode
`npm run dev`

## Demo
`https://hackernews-d1967.firebaseapp.com/`
 
### Function
- タブ
    - NEW: 最新記事
    - POPULAR: 最も読まれている記事
    - JOB: ITやマーケティングなど仕事に関する記事
    - FAVORITE: お気に入り機能
        - 各記事のスターをクリックするとお気に入りとしてFAVORITEへ登録、または解除
- 検索機能
    - 各タブでインクリメンタルサーチが可能