#!/bin/sh

yarn run build

# オプションで port 変更ができない & 環境変数は使えないのでデフォルトポートを上書きする
sed 's|4321|3000|' -i dist/server/entry.mjs

# esbuild で bundle し、node_modules を不要にする
yarn bundle

mkdir -p .amplify-hosting/compute

mv dist/client .amplify-hosting/static
mv dist/server .amplify-hosting/compute/default

cp deploy-manifest.json .amplify-hosting/deploy-manifest.json

# external module である sharp は node_modules に含める必要がある
if [ -d node_modules/sharp ]; then
  rm -rf .amplify-hosting/compute/default/node_modules
  mkdir -p .amplify-hosting/compute/default/node_modules
  cp -r node_modules/sharp .amplify-hosting/compute/default/node_modules/
fi
