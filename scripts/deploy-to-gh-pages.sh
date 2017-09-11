#!/bin/bash

# Exit with nonzero exit code if anything fails.
set -e

# Define repository relative GitHub address.
repositoryRelativeGitHubAddress="Flexberry/ember-flexberry-designer"

# Clone project into 'repository' subfolder && move to it.
echo "Prepare for deploy to gh-pages."
echo "Clone ${repositoryRelativeGitHubAddress} repository & checkout latest version of gh-pages branch."
git clone --recursive "https://github.com/${repositoryRelativeGitHubAddress}.git" repository
cd repository

# Remember existing remote branches in array.
existingRemoteBranches=()
for branch in `git branch -r`;
do
  if [ "${branch}" != "origin/HEAD" ] && [ "${branch}" != "origin/gh-pages" ] && [ "${branch}" != "->" ];
  then
    echo "Add remote branch ${branch} into existing branches array"
    existingRemoteBranches=("${existingRemoteBranches[@]}" "${branch#origin/}")
  fi
done
existingRemoteBranches=($(echo "${existingRemoteBranches[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

# Checkout gh-pages brunch & pull it's latest version.
git checkout gh-pages
git pull

# Itarate over 'gh-pages'-branch directories (except 'stylesheets' and 'images').
shopt -s dotglob
find * -prune -type d | while read directory; do
  if [ "${directory}" != "stylesheets" ] && [ "${directory}" != "images" ] && [ "${directory}" != ".git" ];
  then
    branch="${directory}"

    branchExists=false
    if [ $(echo ${existingRemoteBranches[@]} | grep -o "${branch}" | wc -w) -ne 0 ];
    then
      branchExists=true
    fi

    # Remove directories for those branches which doesn't exist anymore.
    if [ $branchExists = false ];
    then
      echo "Remove results of previous deploy (for ${branch} branch), because it doesn't exist anymore."
      rm -rf "${branch}"
    fi
  fi
done

# Remove results of previous deploy (for current branch) & recreate directory.
echo "Remove results of previous deploy (for ${TRAVIS_BRANCH} branch)."
rm -rf "${TRAVIS_BRANCH}"
mkdir "${TRAVIS_BRANCH}"

# Copy builded ember application from 'dist' folder into 'repository/${TRAVIS_BRANCH}'.
echo "Copy builded ember application (for ${TRAVIS_BRANCH} branch)."
cp -r ../dist/* "${TRAVIS_BRANCH}"

# Configure git.
git config user.name "Flexberry-man"
git config user.email "mail@flexberry.net"

echo "Commit & push changes."
git add --all
git commit -m "Update gh-pages for ${TRAVIS_BRANCH} branch"

# Redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@github.com/${repositoryRelativeGitHubAddress}.git" > /dev/null 2>&1

echo "Deploy to gh-pages finished."

# generate autodoc

# npm install -g yuidocjs
# git clone --recursive https://github.com/Flexberry/Documentation.git docs
# cd docs

# npm install
# git submodule update --remote --merge
# cd "${TRAVIS_BRANCH}"
# yuidoc

# git config user.name "Flexberry-man"
# git config user.email "mail@flexberry.net"

# git add --all
# git commit -m "Update docs" -m "By Travis, Repo ${TRAVIS_REPO_SLUG}, Build #${TRAVIS_BUILD_NUMBER}, Commit ${TRAVIS_COMMIT}, Branch ${TRAVIS_BRANCH}."

# Redirect any output to /dev/null to hide any sensitive credential data that might otherwise be exposed.
# $ git push --force --quiet "https://${GH_TOKEN}@github.com/Flexberry/Documentation.git" > /dev/null 2>&1

# echo "Done."
