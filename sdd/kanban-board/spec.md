# Kanban Board Specification

## board-management

### Purpose

The board MUST display and organize tasks into columns representing workflow stages, providing a visual overview of work progress.

### Requirements

#### Requirement: Board renders with 3 default columns

The system MUST render a board with exactly 3 columns labeled "To Do", "In Progress", and "Done" on initial load.

##### Scenario: Display default columns

- GIVEN the application loads
- WHEN the board renders
- THEN 3 columns MUST be visible with labels "To Do", "In Progress", and "Done"

##### Scenario: Empty column display

- GIVEN the board has rendered
- WHEN a column contains no cards
- THEN the column MUST display an empty state indicator (e.g., "No cards")

#### Requirement: Cards display within their assigned column

Cards MUST be displayed inside the column matching their current status.

##### Scenario: Card appears in correct column

- GIVEN a card exists with status "In Progress"
- WHEN the board renders
- THEN the card MUST appear inside the "In Progress" column

## card-crud

### Purpose

Users MUST be able to create, read, update, and delete cards to manage their tasks.

### Requirements

#### Requirement: Create a card

The system MUST allow users to create new cards with a title and an optional description.

##### Scenario: Create card with title only

- GIVEN the user is viewing the board
- WHEN the user clicks "Add Card" in any column and enters a title
- THEN a new card MUST appear in that column with the given title

##### Scenario: Create card with title and description

- GIVEN the user is viewing the board
- WHEN the user clicks "Add Card", enters a title and a description, and confirms
- THEN the card MUST display both title and description in the column

##### Scenario: Create card with empty title

- GIVEN the user is creating a card
- WHEN the user submits the form with an empty title
- THEN the system MUST reject the submission and show a validation error

#### Requirement: Edit a card

The system MUST allow users to edit an existing card's title and description.

##### Scenario: Edit card title

- GIVEN a card exists on the board
- WHEN the user edits the card and changes its title
- THEN the card MUST display the updated title

##### Scenario: Cancel edit restores original

- GIVEN a card exists on the board
- WHEN the user starts editing, makes changes, then cancels
- THEN the card MUST revert to its original title and description

#### Requirement: Delete a card

The system MUST allow users to delete a card.

##### Scenario: Delete card removes it from board

- GIVEN a card exists on the board
- WHEN the user deletes the card
- THEN the card MUST be removed from the board

##### Scenario: Confirm before delete

- GIVEN a card exists on the board
- WHEN the user clicks delete
- THEN the system SHOULD show a confirmation prompt before removing the card

## card-reorder

### Purpose

Users MUST be able to reorder cards within a column and move cards between columns to reflect workflow changes.

### Requirements

#### Requirement: Drag card within column

The system MUST allow users to drag a card to a different position within the same column.

##### Scenario: Reorder card within column

- GIVEN a column contains multiple cards
- WHEN the user drags a card to a new position within the same column
- THEN the card MUST appear at the new position after drop

##### Scenario: Visual feedback during drag

- GIVEN the user is dragging a card
- WHEN the drag operation is active
- THEN the system SHOULD show visual feedback (e.g., highlighted drop target, card elevation)

#### Requirement: Drag card between columns

The system MUST allow users to drag a card from one column to another.

##### Scenario: Move card to different column

- GIVEN a card exists in "To Do"
- WHEN the user drags the card to "In Progress" and drops it
- THEN the card MUST appear in "In Progress"
- AND the card's status MUST reflect the new column

##### Scenario: Drag to invalid position snaps back

- GIVEN the user is dragging a card
- WHEN the user drops the card outside any valid column target
- THEN the card MUST return to its original position

## data-persistence

### Purpose

Board state MUST persist across page reloads using localStorage.

### Requirements

#### Requirement: Save board state to localStorage

The system MUST persist all board data (columns, cards, positions) to localStorage after every change.

##### Scenario: State saved after card creation

- GIVEN a board with existing cards
- WHEN the user creates a new card
- THEN the complete board state MUST be written to localStorage

##### Scenario: State saved after card move

- GIVEN a card exists on the board
- WHEN the user moves a card to a different column
- THEN the updated board state MUST be written to localStorage

#### Requirement: Restore board state from localStorage

The system MUST load and restore board state from localStorage on application start.

##### Scenario: State restored on reload

- GIVEN the user has added cards and arranged them on the board
- WHEN the page is reloaded
- THEN all cards MUST appear in their previous columns and positions

##### Scenario: Handle corrupted localStorage gracefully

- GIVEN the localStorage data is corrupted or has invalid format
- WHEN the application loads
- THEN the system MUST initialize with the default empty board state
- AND MUST NOT throw an unhandled error
