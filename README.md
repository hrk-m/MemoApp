# 概要

React Native, Firebase, Expo を使ってメモアプリを開発


# どういったもの動画

- todo(memo) app

![アプリデモ](docs/video1.mov)


# モバイル設定

- Android Studio
  - https://docs.expo.dev/workflow/android-studio-emulator/ をもとにインストールと設定
- IOS
  - XCode → Open Developer Tool → Simulator

# インフラ
[Firebase](https://console.firebase.google.com/project/memoapp-23cf7/overview?hl=ja)

# 起動
```
npm run start
```


# メモ

## Permissions

Cloud Firestore のルールに以下を設定
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/memos/{memo} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```
