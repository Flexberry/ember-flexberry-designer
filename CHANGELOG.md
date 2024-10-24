# Ember Flexberry Designer Changelog
All notable changes to this project will be documented in this file.


## [Unreleased]

## [1.1.2-beta.2] - 2024-09-26
### Added
* Added set vertices when link drawing.

### Fixed
 * Fixed referenceCount decrement when deleting all primitives from diagram.
 * Fixed the swimlane separator on the activity diagram.
 * Fixed diagram edit after class delete.
 * Fixed class sorting when name is empty.

## [1.1.2-beta.1] - 2024-09-04
### Fixed
 * Fixed referenceCount decrement on diagrams
 * Fixed std primitives

## [1.1.1] - 2024-07-01
### Added
* Company stage setting.
* Added drawing objects over of other objects.
* Added UML diagram draw field autoresizing.
* Added double-click object editing.
* Added hiding of empty text input fields for links in readonly diagram mode.
* Added attribute property storage on table.

### Fixed
* Fixed dse transforms.
* Fixed shape of active state object on activity diagram.
* Fixed save empty multiplicity.
* Fixed highlighting of background element `flexberry.uml.Partition`.
* Fixed enum attributes types to be null.
* Fixed vertex transposition in links.

## [1.1.0] - 2024-03-25
### Added
* Added component for DSE.
* Added sorting of data object and views for forms.
* Added button for ai-assistant.
* Added uml-correct button for stage.

### Changed
* Update default fdg settings.
* Updated create auditfields logic.
* Update ember-flexberry to 3.11.1-beta.3.
* Saving optimization, views cleaned.

### Fixed
* Fixed styles.
* Fixed sitemap.
* Fixed dpd diagram objects.
* Fixed notStored class.
* Fixed external master attributes in view.
* Fixed form errors for external class.
* Fixed styles for collapsed toolbar buttons.
* Fixed icon and title for expand sheet button.
* Fixed finding class with non stored classes.
* Fixed button for ai-assistant.
* Fixed save logic.
* Fixed headers.
* Fixed batch projections when saving diagram.
* Fixed broken objects on diagram for inheritance.
* Fixed error when importing stage.

## [1.0.0]
### Added
* Added exit project button.
* Added the ability to create editform/listform via diagram.
* Added batch.
* Added logic for fix broken diagrams.
* Added cicd in fdg.
* Disabled save button on diagram.
* Added external classes in view.
* Added select template for external class.
* Added reset or no selected object.
* Moving a group of objects on a diagram.
* Added copy view button.

### Changed
* Hide class edit form button when class is new.
* Сhanged icons and buttons style.
* Сhange the theme.
* Update backup method.
* Changed master property on view form.

### Fixed
* Fixed selected text on diagram.
* Fixed error with brocken diagrams.
* Fixed an error when renaming a class.
* Unselected object move alone.
* Fixed open new diagram.
* Fixed duplicate styles.
* Fixed display of text of link.
* Moved resize buttons to top of connection.
* Fixed diagram deletion confirmation message.
* Fixed stage relevance check.
* Fixed font error.
* Fixed diagram saving when class name is missing.
* Fixed saving of state diagrams.
* Fixed timezone if missing.
* Fixed unsaved type map bug.
* Fixed typemap after changing stages.
* Fixed open typemap.
* Fixed add node in definition.
* Fixed sync button popup.
* Fixed namespace class object for net 7.

## [0.15.0-beta.26]
### Fixed
* Fix checkCorrectTypeMap bug.

## [0.15.0-beta.25]
### Fixed
* Fix type map.

## [0.15.0-beta.24]
### Added
* Add Autoincrement on attribute table.
* Add connection string on generation form.

## [0.15.0-beta.23]
### Fixed
* Fix update attribute table.

## [0.15.0-beta.22]
### Changed
* Change sorting for view fields in fd-create-view.

## [0.15.0-beta.21]
### Changed
* Add sorting for view fields in fd-create-view.

## [0.15.0-beta.20]
### Added
* Add sync stage button.
* Add new audit settings.

## [0.15.0-beta.19]
### Added
* Add only classes filter.

### Fixed
* Typos in locales.

## [0.15.0-beta.18]
### Added
* Add message box on gen form.

### Changed
* Update attribute table.

## [0.15.0-beta.17]
### Added
* Add button add audit in all class.
* Add new models.

## [0.15.0-beta.16]
### Added
* Add orange color sheme.

## [0.15.0-beta.15]
### Added
* Add UML validator and corrector odata function.

## [0.15.0-beta.14]
### Changed
* Add new generation settings.

## [0.15.0-beta.13]
### Changed
* Fixed trigger generation for selected class.

## [0.15.0-beta.12]
### Changed
* Fixed trigger generation for selected class.

## [0.15.0-beta.11]
### Added
* Add trigger generation for selected class.

## [0.15.0-beta.10]
### Changed
* Fixed lock service.
* Fixed view-helper.

## [0.15.0-beta.9]
### Added
* Add toolbar collapsed button to diagram sheet.

### Fixed
* Fix list buttons style.
* Fix default gen setting.

## [0.15.0-beta.8]
### Fixed
* Fixed update genSettingsFile.

## [0.15.0-beta.7]
### Fixed
* Fixed minor bugs.

## [0.15.0-beta.6]
### Fixed
* Fixed update generation settings file.

## [0.15.0-beta.5]
### Added
* Add data types map.

## [0.15.0-beta.4]
### Fixed
* Fixed navigation form.
* Transferred disconnectGithub in generation form.

## [0.15.0-beta.3]
### Fixed
* Fixed generation form.

## [0.15.0-beta.2]
### Changed
* Changed generation.

## [0.15.0-beta.1]
### Fixed
* Fix user access table.
* Fix attributes property.

## [0.14.3]
### Added
* Clear module settings button.

## [0.14.2]
### Fixed
* Fix update store when batch.

## [0.14.1]
### Changed
* Change use template caption, when create new project.
* Swap diagrams and model position in main menu.

### Fixed
* Fix work hotkey in inputs on diagrams primitives.
* FIx save class.

## [0.14.0]
### Added
* Add stage export.
* Add stage import.
* Add panel of class dependencies diagrams on class sheet.
* Add settings color diagram elements.
* Add support "Delete" hotkey for diagram.
* Add support "Ctrl + A" hotkey for diagram.
* Add support "Ctrl + C" hotkey for diagram.
* Add support "Ctrl + V" hotkey for diagram.
* Add support "Ctrl + S" hotkey for diagram.
* Add support "Ctrl + Z" hotkey for diagram.
* Add support "Ctrl + Y" hotkey for diagram.
* Add support selected diagram element with press "Shift" or "Ctrl".
* Add git unlogin.

### Fixed
* Unlock empty object. When object creating.
* Fix setButtonStyles.
* Fix locales.
* Fix style editform and listform constructors.
* Fix delete class.
* Fix disabled link imputs.
* Fix link lock.

## [0.13.0]
### Added
* Add resize and colors to statechart diagram.
* Add resize and colors to deployment diagram.
* Add resize and color to activity diagram.
* Add table for user access settings.
* Add storage table.
* Add rename stage objects function.
* Add template class resize.
* Add check errors on all projects page.
* Add highlight for links.
* Add links edit forms.
* Added swimline primitive.
* Add locks for diagrams and repository objects.

### Fixed
* Highlight optimization.
* Fix rollback new class on diagrams.
* Fix link role label.
* Feature update view when deleting class.
* Fix rollback diagrams.
* Fix colors in collapsed class.
* Fix locales in groups.
* Fix group by system.
* Fix actors size with proportions.

## [0.12.0]
### Added
* Add rename class.
* Add change systems.
* Filter in lists.

### Fixed
* Fix some styles.
* Fix errors in modal dialog.
* Fix view link.
* Fix view cycle link.
* Fix paper size.
* Fix add NoteConnector.
* Fix collapse class

## [0.11.0]
### Added
* Add geolayer edit panel.
* Add geolayerstyle edit panel.
* Add gisSubSystem.
* Add settings page.
* Mobile styles

### Fixed
* Style share button in dark theme.
* Style add navigation page.
* Fix fade diagrams.

## [0.10.2] - 2019-11-08
### Fixed
* Fix create AutogeneratedSystem.

## [0.10.1] - 2019-11-07
### Fixed
* Fix share button.

## [0.10.0] - 2019-11-07
### Added
* Add audit and authority in class settings.
* Add readonly mode.
* Add sort data by name in list.
* Add style for base modal window.
* Add share button.
* Add print diagrams.

### Fixed
* Fix diagram toolbar hidden.
* Fix toggle sidebar button.
* Remove round buttons.
* Fix modal window styles.

## [0.9.2] - 2019-10-08
### Added
* Add connection points for links.

## [0.9.1] - 2019-10-08
### Fixed
* Fix sidebar and list styles.

## [0.9.0] - 2019-10-02
### Added
* Edit form for editforms.
* Edit form for listforms.
* Integration of application model form and diagrams.
* Add unload store.
* Log error.
* Clear store in choose project.
* Input in cod dpd std diagrams primitives.
* Dark and blue style theme.
* Dynamic theme changes.
* Show error model message.

### Fixed
* Remove the delete button when creating a new record.
* Fix locales.
* Update model projections.
* Loop in inheritance.
* Fix coordinates in firefox.
* Fix style view and toolbar for diagrams.
* Fix save diagrams.
* Fix delete diagrams.

## [0.8.1-beta.2] - 2019-09-12
### Fixed
* Fix view styles.
* Fix readonly link.
* Fix delete class from model form.

## [0.8.1-beta.1] - 2019-09-09
### Fixed
* Fix empty class nameStr.
* Fix update str value with ru symvols.
* Fix coordinates in firefox.

## [0.8.0] - 2019-09-02
### Added
* Added navigation tree.
* Added logic for create new class button.
* Added logic for create new diagram button.
* Added logic for delete class button.
* Change text ability on activity diagram primitives.
* Add primitives resizing on cad diagram.
* Add text and background colors for primitives on cad diagram.
* Add create prototype button.

### Fixed
* Fix new project creating.
* Fix cad class attributes and methods parsing.
* Fix `fd-button` type.

### Changed
* Change link to link realization to JointJS 3.

## [0.7.0] - 2019-05-31
### Added
* Added json update when editing diagrams.
* Added styles for the application generation page.
* Added component "Round button".
* Implemented join to connections for other primitives.
* Added collapse button for diagram edit panel toolbar.
* Added collapse button for class primitives.
* Added highlight feature for cad elements.
* Added check on exist diagram elements.
* Added delete button for class primitives.
* Button to open the object edit form from the diagram.
* Roll back changes on diagram when close edit form or diagram.

### Changed
* Corrected the error when restarting the project.
* Removed the ability to detach intermediate links from link-connectors.
* Different stylistic edits.
* The diagram in the `{{fd-uml-diagram}}` component now has an infinite size.
* Links can't have empty source or target.
* Optimized movement of diagram elements.

### Fixed
* Textarea size in elements cad diagram.
* Fixed save cad diagram.
* Fixed styles of the component "Table".
* Saving unchanged objects on diagrams.

## [0.6.0] - 2019-04-12
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
* Forms of generation for new design.
* Current project name view.

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
