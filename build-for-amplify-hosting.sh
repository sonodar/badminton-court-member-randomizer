#!/bin/sh

yarn run build

# オプションで port 変更ができない & 環境変数は使えないのでデフォルトポートを上書きする
sed 's|4321|3000|' -i dist/server/entry.mjs

mkdir -p .amplify-hosting/compute

mv dist/client .amplify-hosting/static
mv dist/server .amplify-hosting/compute/default

cp deploy-manifest.json .amplify-hosting/deploy-manifest.json

# node_modules を軽量化する（ただし、node_modules はキャッシュするのでそのままにしておく）
yarn install --production --modules-folder node_modules_production

rm -rf .amplify-hosting/compute/default/node_modules
mv node_modules_production .amplify-hosting/compute/default/node_modules
