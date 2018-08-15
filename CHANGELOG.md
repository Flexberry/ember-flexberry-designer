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

### Changed
* The edit form constructor:
  * The addition of controls takes place depending on the selected item.
  * The type of the displayed component for the control depends on the type of property.
* Clicking on class with stereotype `listform` or `edit form` will open form constructor.

### Fixed
* The view edit form:
  * Loading recursion in the tree.
  * Duplicating Aggregators.
  * Editing the title and description of view in the panel.
* Pressing 'Close' button in form constructors will open previous page.

## [0.2.0] - 2018-06-26
### Added
* Implemented the minimum set of functionality needed for use.

## [0.1.0] - 2017-10-01
* The first release.
