# メモアプリ

## 概要

このプロジェクトは Expo Router を使用したモバイルメモアプリケーションです。シンプルで使いやすい UI と、効率的なメモ管理機能を提供します。

## 技術スタック

- **フレームワーク**: Expo
- **ルーティング**: Expo Router
- **認証**: カスタム認証プロバイダー
- **バックエンド**: Supabase
- **UI**: React Native + カスタムテーマ
- **言語**: TypeScript

## 主な機能

- メモの作成・編集・削除
- カテゴリ分け
- ダークモード/ライトモードの切り替え
- ユーザー認証
- クラウド同期

## セットアップ

```bash
# 依存関係のインストール
npm install
# または
yarn install

# 開発サーバーの起動
npm start
# または
yarn start
```

## 使用方法

1. アプリを起動し、アカウントにログインまたは新規登録
2. ホーム画面から「新規メモ」ボタンをタップしてメモを作成
3. メモ一覧から既存のメモをタップして編集
4. 設定画面からテーマやその他の設定を変更

## プロジェクト構造

```
app/
  ├── (auth)/      # 認証関連のルート
  ├── (tabs)/      # タブナビゲーション
  ├── _layout.tsx  # ルートレイアウト
  └── index.tsx    # メインページ
providers/
  ├── AuthProvider.tsx    # 認証状態管理
  ├── SupabaseProvider.tsx # Supabase連携
  └── ThemeProvider.tsx   # テーマ管理
hooks/
  └── useFrameworkReady.ts # フレームワーク初期化
```

## 開発ガイドライン

- 新しい機能を追加する場合は、適切なディレクトリ構造に従ってください
- コンポーネントは再利用可能な形で設計してください
- すべてのページで`SafeAreaView`を使用して、デバイスの安全領域を考慮してください

## 貢献方法

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

このプロジェクトは[MIT ライセンス](LICENSE)の下で公開されています。
