// Requirement of ember-browserify.
// In order to use NPM pacakges inside the addon, we have to import
// them from somewhere in /app directory.
// See: https://github.com/ef4/ember-browserify#using-ember-browserify-in-addons
import uuid from 'npm:node-uuid';
import joint from 'npm:jointjs';
