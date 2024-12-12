#!/usr/bin/env bash

files=`find ./src/apis -name "responses.ts"`

for filePath in $files ; do
  component=$(basename $(dirname "$filePath"))
  modelPath="./src/__models__/$component-responses.zod.ts"

  yarn ts-to-zod $filePath $modelPath &> /dev/null &
done

wait