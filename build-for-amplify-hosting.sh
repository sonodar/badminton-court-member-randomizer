#!/bin/sh

yarn run build

# オプションで port 変更ができない & 環境変数は使えないのでデフォルトポートを上書きする
sed 's|4321|3000|' -i dist/server/entry.mjs

mkdir -p .amplify-hosting/compute

mv dist/client .amplify-hosting/static
mv dist/server .amplify-hosting/compute/default

cp deploy-manifest.json .amplify-hosting/deploy-manifest.json

# node_modules を軽量化する（ただし、node_modules はキャッシュするのでそのままにしておく）
rm -rf node_modules_production
yarn install --production --ignore-optional --ignore-scripts --modules-folder node_modules_production
# なぜか typescript や babel が含まれているので削除 (30Mもある)
rm -rf node_modules_production/{typescript,@babel}

rm -rf .amplify-hosting/compute/default/node_modules
mv node_modules_production .amplify-hosting/compute/default/node_modules
