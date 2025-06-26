#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Releasing is only allowed from CI."
  exit 1
fi

yarn ts

yarn build:docs
aws s3 sync ./doc s3://dam-acquia-docs-us-east-1/acquia-dam-ts-sdk --delete

yarn changeset publish