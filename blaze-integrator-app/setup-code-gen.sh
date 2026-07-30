#!/bin/sh

echo "[❗] Clearing cache"
rm -rf .yarn/cache .nx/cache .angular node_modules yarn.lock dist

if [ ! -f ./yarn.lock ]; then
  echo "[❗] yarn.lock File not found!"
  echo "[📄] creating new lock file.."
  touch yarn.lock
fi

echo "[⚡] Setting Environment variable"
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain fss --domain-owner 736483234466 --query authorizationToken --output text --no-verify-ssl`

echo "[📝] Setting yarn config"
yarn config set npmRegistryServer https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/
yarn config set 'npmRegistries["https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/"].npmAuthToken' "${CODEARTIFACT_AUTH_TOKEN}"
yarn config set 'npmRegistries["https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/"].npmAlwaysAuth' "true"

echo "[⚡] Running yarn"
yarn
