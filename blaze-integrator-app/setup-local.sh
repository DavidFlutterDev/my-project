#!/bin/sh

echo "[❗] Clearing cache"
rm -rf .yarn/cache .nx/cache .angular node_modules yarn.lock dist

if [ ! -f ./yarn.lock ]; then
    echo "[❗] yarn.lock File not found!"
    echo "[📄] creating new lock file.."
    touch yarn.lock
fi

echo "[⚡] Performing AWS login"
aws sso login  --no-verify-ssl --profile ${AWS_PROFILE}

echo "[⚡] Setting Environment variable"
export CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain fss --domain-owner 736483234466 --query authorizationToken --output text --no-verify-ssl --profile ${AWS_PROFILE})
echo "[📝] Setting yarn config"

yarn config set npmRegistryServer https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/
yarn config set 'npmRegistries["https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/"].npmAuthToken' "${CODEARTIFACT_AUTH_TOKEN}"
yarn config set 'npmRegistries["https://fss-736483234466.d.codeartifact.ap-south-1.amazonaws.com/npm/npm-store/"].npmAlwaysAuth' "true"

echo "[⚡] Running yarn"
yarn

# echo "[⚡] Setting sdks"
# yarn dlx @yarnpkg/sdks

# echo "[⚡] Extracting required artifacts.."

# # Detect the platform (similar to $OSTYPE)
# OS="`uname`"
# case $OS in
#   'Linux')
#     OS='Linux'
#     echo OS Type [🐧]
#     sudo apt install unzip python3-tqdm -y
#     ;;
#   'Darwin')
#     OS='Mac'
#     echo OS Type [🍎]
#     brew install unzip
#     curl https://bootstrap.pypa.io/get-pip.py | python
#     pip install "git+https://github.com/tqdm/tqdm.git@devel#egg=tqdm"
#     ;;
#   *) ;;
# esac

# cd .yarn/cache

# #################################################################
# ###################  All Clay Libs ##############################
# #################################################################

# fVar=$(find * -type f -name '@clay-ui-commons-npm-*.*\.zip');
# n_files=`unzip -l ${fVar} | tail -n 1 | xargs echo -n | cut -d' ' -f2`
# unzip -o ${fVar} "node_modules/@clay/ui-commons/assets/*" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null
# unzip -o ${fVar} "node_modules/@clay/ui-commons/styles/*" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null
# unzip -o ${fVar} "node_modules/@clay/ui-commons/esm2022/**/*.mjs" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null

# fVar=$(find * -type f -name '@clay-tailwind-preset-npm-*.*\.zip');
# n_files=`unzip -l ${fVar} | tail -n 1 | xargs echo -n | cut -d' ' -f2`
# unzip ${fVar} "node_modules/@clay/tailwind-preset/tailwind.config.js" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null
# unzip -o ${fVar} "node_modules/@clay/tailwind-preset/styles/*" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null
# unzip -o ${fVar} "node_modules/@clay/tailwind-preset/tailwind/*" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null

# fVar=$(find * -type f -name '@clay-ui-components-npm-*.*\.zip');
# n_files=`unzip -l ${fVar} | tail -n 1 | xargs echo -n | cut -d' ' -f2`
# unzip -o ${fVar} "node_modules/@clay/ui-components/esm2022/**/*.mjs" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null

# fVar=$(find * -type f -name '@clay-app-shell-npm-*.*\.zip');
# n_files=`unzip -l ${fVar} | tail -n 1 | xargs echo -n | cut -d' ' -f2`
# unzip -o ${fVar} "node_modules/@clay/app-shell/styles/*" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null
# unzip -o ${fVar} "node_modules/@clay/app-shell/esm2022/**/*.mjs" -d "./../../" | tqdm --desc extracted --unit files --unit_scale --total $n_files > /dev/null

# #####################################################################
# #####################################################################

# #####################################################################
# #################### Other libs #####################################
# #####################################################################

# echo "[⚡] Building project to verify.."
# yarn build
