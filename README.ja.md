# autoware-website-tests

[English](README.md) | [日本語](README.ja.md)

![CI](https://github.com/haili-hub/autoware-website-tests/actions/workflows/ci-e2e-tests.yml/badge.svg)
[![テストレポート](https://img.shields.io/badge/テストレポート-GitHub%20Pages-blue)](https://haili-hub.github.io/autoware-website-tests/)

## 概要

Autoware ウェブサイトのナビゲーションワークフローを対象とした Playwright E2E テストです。ホームページから GitHub リポジトリの README までの一連の操作をカバーしています。

## 動作要件

- Node.js（LTS）
- Chromium（Playwright 経由でインストール）
- `autoware.org` および `github.com` へのインターネット接続

## テスト計画

テスト計画の詳細は `specs/autoware-website-navigation.test-plan.md` を参照してください。

## テスト一覧

| ファイル | テスト | 対象 |
| -------- | ------ | ---- |
| `TC001_initial-access.ts` | 初期アクセス | autoware.org |
| `TC002_find-github-link.ts` | ホームページの GitHub CTA | autoware.org → github.com/autowarefoundation |
| `TC003_repository-access.ts` | ホームページからリポジトリまでの導線 | autoware.org → github.com/autowarefoundation/autoware |
| `TC004_readme-content.ts` | README 内容の確認 | autoware.org → github.com/autowarefoundation/autoware#readme |

## セットアップ

```bash
npm ci
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

`playwright.config.ts` では Chromium、Firefox、WebKit（Safari）を使用し、`autoware.org` の読み込みに対応するため以下のタイムアウトを設定しています：

| 設定項目 | 値 |
| -------- | -- |
| テストタイムアウト | 60秒 |
| ナビゲーションタイムアウト | 60秒 |
| アクションタイムアウト | 30秒 |
| リトライ（CI） | 2回 |
| ワーカー数 | 1 |
| 並列実行 | オフ |

デフォルトでは HTML レポーターを使用します。`npm run test:allure`（`ALLURE=true`）で Allure レポーターに切り替わります。初回リトライ時にトレースを収集します。シングルワーカーのシリアル実行により、外部サイト依存によるフレークを抑制しています。

## CI

`main` へのコミットをプッシュすると、CI ワークフローが自動的にトリガーされます。別途操作は不要です。`main` へのプルリクエスト時にも自動実行されます。

`main` へプッシュした後の流れは次のとおりです：

1. `git push origin main` で **CI — E2E Tests** が開始される。
2. `test` ジョブが GitHub Actions 上で Playwright スイートを実行する。
3. `deploy` ジョブが `test` の後に実行され、最新の HTML レポートを GitHub Pages に公開する。

新しいコミットなしで手動でトリガーするには：

1. GitHub の **Actions** → **CI — E2E Tests** を開く。
2. **Run workflow** → **Run workflow** をクリック。

または GitHub CLI を使用：

```bash
gh workflow run ci-e2e-tests.yml --repo <your-username>/autoware-website-tests
```

`main` への CI 実行後、最新のテストレポートが GitHub Pages に公開されます。

## GitHub Copilot Code Agent

このリポジトリには、Copilot 用の実行環境を準備する専用ワークフロー `.github/workflows/copilot-setup-steps.yml` も含まれています。

- 目的: GitHub 上の実行環境に Node 依存関係と Playwright Chromium を用意し、Copilot のコーディング作業でもローカル開発に近い前提をそろえること。
- 実行内容: `actions/checkout`、`actions/setup-node`、`npm ci`、`npx playwright install --with-deps chromium`。
- 実行タイミング: 手動の `workflow_dispatch`、または `.github/workflows/copilot-setup-steps.yml` 自体が push / pull request で変更されたとき。
- 通常の開発で必要なこと: 特になし。通常のテスト検証は引き続き **CI — E2E Tests** を使用します。
- 意識する場面: GitHub Copilot の coding agent を使う場合、またはそのセットアップ用ワークフローを保守する場合のみ。

## 自分のアカウントで使う

1. **フォーク** — GitHub でこのリポジトリをフォークする。

2. **GitHub Pages を有効化** — フォーク先のリポジトリで次の設定を行う：
   **Settings → Pages → Source → GitHub Actions**

3. **バッジ URL を更新** — `README.md` と `README.ja.md` の先頭にある CI バッジおよびテストレポートバッジの URL 内の `haili-hub` を自分の GitHub ユーザー名に置き換える。

4. **初回実行をトリガー** — `main` へコミットをプッシュするか、GitHub CLI で手動実行する：

   ```bash
   gh workflow run ci-e2e-tests.yml --repo <your-username>/autoware-website-tests
   ```

初回実行後、CI バッジが有効になり、テストレポートが `https://<your-username>.github.io/autoware-website-tests/` で公開されます。

## 備考

- 自動テストが対象にしているのは、公開ホームページから GitHub の README までの導線確認です。
- macOS のサンドボックス付き AI エージェント実行環境では、Chromium が Mach port の権限エラーで起動前に失敗することがあります。これはテスト内容ではなく実行環境の問題なので、CI またはサンドボックス外のローカル実行を使用してください。
- `autoware.org` はバックグラウンドポーリングを使用しているため `networkidle` が解決されません。テストではデフォルトの `load` イベントを使用しています。
- GitHub のようなサードパーティーページでは、要件が「到達先の確認」である場合はアンカーの `href` を検証してから直接遷移することを優先します。`click()` はクリック操作自体を検証したい場合に限って使用します。
- `playwright-core` などの依存関係はローカルの `node_modules/` に配置し、GitHub にはコミットしません。clone 後に `npm ci` と `npx playwright install chromium` を実行してください。
