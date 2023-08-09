#!/bin/bash
#
# Exports latest update number from the git tag into a variable later used in pipeline job
#
# refresh all tags from remote 
git fetch --tags >/dev/null

# get latest tag - we search for numeric tags only sorted by creation date
# LATEST_TAG=$(git for-each-ref --sort='-*authordate' --format '%(refname:short)' 'refs\/tags\/update-[0-9]*' | head -1)
LATEST_TAG=$(git tag --list 'update-*' | tail -1)

# if tag not found, the default update number will be 1
CI_LATEST_UPDATE_TAG=${LATEST_TAG:-"update-1"}
CI_LATEST_UPDATE_NUMBER=${CI_LATEST_UPDATE_TAG:7}
CI_NEXT_UPDATE_NUMBER=$((CI_LATEST_UPDATE_NUMBER+1))

# echo "Got update number ${CI_NEXT_UPDATE_NUMBER}"
# export for use in CI stage 
# https://stackoverflow.com/questions/16338086/bash-return-value-from-subscript-to-parent-script
echo ${CI_NEXT_UPDATE_NUMBER}
# export CI_NEXT_UPDATE_NUMBER