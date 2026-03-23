# auto-website-tests

[English](README.md) | [日本語](README.ja.md)

![CI](https://github.com/haili-hub/autoware-website-tests/actions/workflows/ci-e2e-tests.yml/badge.svg)
[![テストレポート](https://img.shields.io/badge/テストレポート-GitHub%20Pages-blue)](https://haili-hub.github.io/autoware-website-tests/)

Autoware ウェブサイトのナビゲーションワークフローを対象とした Playwright E2E テストです。ホームページから GitHub リポジトリの README までの一連の操作をカバーしています。

## テスト一覧

| ファイル | テスト | 対象 |
| -------- | ------ | ---- |
| `tests/website-github-navigation/TC001_initial-access.spec.ts` | 初期アクセス | autoware.org |
| `tests/website-github-navigation/TC002_find-github-link.spec.ts` | ホームページの GitHub CTA | autoware.org → github.com/autowarefoundation |
| `tests/website-github-navigation/TC003_repository-access.spec.ts` | ホームページからリポジトリまでの導線 | autoware.org → github.com/autowarefoundation/autoware |
| `tests/website-github-navigation/TC004_readme-content.spec.ts` | README 内容の確認 | autoware.org → github.com/autowarefoundation/autoware#readme |

## 動作要件

- Node.js（LTS）
- Chromium（Playwright 経由でインストール）
- `autoware.org` および `github.com` へのインターネット接続

## セットアップ

```bash
npm install
npx playwright install chromium
```

## テストの実行

```bash
# 全テストを実行（HTML レポーター）
npm test

# UI モードで実行
npm run test:ui

# デバッグモードで実行
npm run test:debug

# 最新の HTML レポートを開く
npm run test:report
```

## Allure レポート

```bash
# Allure 結果を収集しながらテストを実行
npm run test:allure

# Allure レポートを生成して開く
npm run allure:report
```

結果は `reports/allure-results/` に出力され、生成されたレポートは `reports/allure-report/` に保存されます。

## 設定

`playwright.config.ts` では Chromium のみを使用し、`autoware.org` の読み込みに対応するため以下のタイムアウトを設定しています：

| 設定項目 | 値 |
| -------- | -- |
| テストタイムアウト | 60秒 |
| ナビゲーションタイムアウト | 60秒 |
| アクションタイムアウト | 30秒 |
| リトライ（CI） | 2回 |
| ワーカー数（CI） | 1 |

デフォルトでは HTML レポーターを使用します。`npm run test:allure`（`ALLURE=true`）で Allure レポーターに切り替わります。初回リトライ時にトレースを収集します。

## テスト計画

テスト計画の詳細は `specs/autoware-website-navigation.plan.md` を参照してください。

## 備考

- 自動テストが対象にしているのは、公開ホームページから GitHub の README までの導線確認です。
- **ブラウザ翻訳**（右クリック → 日本語に翻訳）はブラウザのネイティブ機能であり、Playwright では自動化できません。翻訳品質の確認はテスト計画内の手動チェックとして扱います。
- `autoware.org` はバックグラウンドポーリングを使用しているため `networkidle` が解決されません。テストではデフォルトの `load` イベントを使用しています。
