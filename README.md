# 概要

React Native, Firebase, Expo を使ってメモアプリを開発


# どういったもの動画

<div>
  <video controls src="./docs/video1.mp4" muted="false"></video>
</div>

動画は[こちら](https://github.com/hrk-m/MemoApp/blob/main/docs/video1.mp4)からダウンロードしご確認ください。


# figma

https://www.figma.com/design/BEHXzYCGCzI8tahVwgA5AH/MemoApp?node-id=66-2&node-type=canvas&t=GzO27O6mv6wsdXqY-0

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
