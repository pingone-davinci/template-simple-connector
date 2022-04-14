#!/usr/bin/env sh
installDependencies(){
  NODE_VERSION="v14.19.0"
  NVM_VERSION="0.39.1"
  PATH="${NVM_DIR}/versions/node/${NODE_VERSION}/bin:/home/pingidentity/scripts:${PATH}"
  echo "The current NVM home is set to [${NVM_DIR}]" \
    && curl -o /tmp/install.sh https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh
  sh /tmp/install.sh \
    && . "${NVM_DIR}"/nvm.sh \
    && type nvm \
    && nvm install "${NODE_VERSION}" \
    && nvm use "${NODE_VERSION}" \
    && nvm alias default "${NODE_VERSION}" \
    && npm init -y \
    && npm set registry https://sdkshim.pingone-davinci.com/
  npm install --registry https://sdkshim.pingone-davinci.com/
  ls node_modules
}

lint(){
  npx eslint -c utils/scripts/eslintrc.json .
}

unitTest(){
  nyc --check-coverage --lines 80 mocha 'test/*.test.js' --exit true --timeout 1000000
}