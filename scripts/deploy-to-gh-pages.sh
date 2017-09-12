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

# Checkout gh-pages branch & pull it's latest version.
git checkout gh-pages
git pull

# Navigate into dummy deploy folder.
cd dummy

# Remove results of previous deploy (for current branch) & recreate directory.
echo "Remove results of previous deploy (for ${TRAVIS_BRANCH} branch)."
rm -rf "${TRAVIS_BRANCH}"
mkdir "${TRAVIS_BRANCH}"

# Copy builded ember application from 'dist' folder into 'repository/${TRAVIS_BRANCH}'.
echo "Copy builded ember application (for ${TRAVIS_BRANCH} branch)."
cp -r ../../dist/* "${TRAVIS_BRANCH}"

# Generate autodoc.
cd ..
# cd autodoc
# TODO: set autodoc generator config and theme.

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
