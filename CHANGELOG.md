# Ember Flexberry Designer Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
* Edit form for the type map.
* The application structure constructor:
  * Add links in root desktop.
* The list form constructor:
  * Add, sort and remove columns.
  * Add sidebar opening when column is select.
* The edit form constructor:
  * Save the definition of the view.
  * Deselect.
  * The row select.
  * Highlighting the selected items.
  * Button for removing items.
  * Button for moving items.
  * Buttons for sorting items.
  * Add sidebar opening when control is select.
* The view edit form:
  * Add the "Visibility" checkbox to the table.
  * Retracting controls if nothing is selected.
  * Add sidebar opening when view's property is select.
* Edit form for classes with `typemap` stereotype.
* Buttons for adding ucd diagram primitives.
* Forms of projects for new design.
* Current project name view.
* Create new classes in application model.

### Changed
* The edit form constructor:
  * The addition of controls takes place depending on the selected item.
  * The type of the displayed component for the control depends on the type of property.
  * When the single control in the row is selected, you can move the row.
* Clicking on class with stereotype `listform` or `edit form` will open form constructor.
* Unified headings for edit-forms.
* Update ember-flexberry to 2.0.0-beta.2.
* Inputs replaced by textarea in elements cad diagram.

### Fixed
* The view edit form:
  * Loading recursion in the tree.
  * Duplicating Aggregators.
  * Editing the title and description of view in the panel.
* Pressing 'Close' button in form constructors will open previous page.
* Fix autoresize of uml package object.
* Fix size of new diagram paper.

## [0.2.0] - 2018-06-26
### Added
* Implemented the minimum set of functionality needed for use.

## [0.1.0] - 2017-10-01
* The first release.
