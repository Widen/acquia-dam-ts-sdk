#!/bin/bash
set -eo pipefail

if [[ -z "${CI}" ]]; then
  echo "Versioning is only allowed from CI."
  exit 1
fi

# Update changelogs and manifests
yarn changeset version

# yarn.lock stores dependent package versions, so we need
# to update it before committing or CI will fail due to
# yarn.lock being out of date.
yarn install --no-immutable