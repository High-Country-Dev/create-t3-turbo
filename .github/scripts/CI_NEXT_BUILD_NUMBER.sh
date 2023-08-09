#!/bin/bash
#
# Exports latest build number from the git tag into a variable later used in pipeline job
#
# refresh all tags from remote 
git fetch --tags >/dev/null

# get latest tag - we search for numeric tags only sorted by creation date
# LATEST_TAG=$(git for-each-ref --sort='-*authordate' --format '%(refname:short)' 'refs\/tags\/build-[0-9]*' | head -1)
LATEST_TAG=$(git tag --list 'build-*' | tail -1)

# if tag not found, the default build number will be 1
CI_LATEST_BUILD_TAG=${LATEST_TAG:-"build-1"}
CI_LATEST_BUILD_NUMBER=${CI_LATEST_BUILD_TAG:6}
CI_NEXT_BUILD_NUMBER=$((CI_LATEST_BUILD_NUMBER+1))

# echo "Got build number ${CI_NEXT_BUILD_NUMBER}"
# export for use in CI stage 
# https://stackoverflow.com/questions/16338086/bash-return-value-from-subscript-to-parent-script
echo ${CI_NEXT_BUILD_NUMBER}
# export CI_NEXT_BUILD_NUMBER