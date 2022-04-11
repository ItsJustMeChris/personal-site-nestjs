#!/bin/sh

echo "Please enter commit message" 

read commitMessage

echo "\nCommit: $commitMessage\n" 

git stage . && git commit -m "$commitMessage"

read current < version.ts
echo "\nCurrent Build: $current\n"
echo "Please enter the updated build version"

read version


echo "export default '$version';" > version.ts

git stage . && git commit -m "Bump version: $version"
npm version $version

echo "Ready to push"