# Column Management Specification

## Purpose

Users MUST be able to add, rename, and delete columns to adapt the board to their workflow.

## Requirements

### Requirement: Add a column

The system MUST allow users to add a new column to the end of the board.

#### Scenario: Add column with valid title

- GIVEN the user is viewing the board
- WHEN the user clicks "Add Column" and enters a title
- THEN a new column MUST appear at the end of the board with the given title
- AND the new column MUST contain an empty card list

#### Scenario: Add column with empty title rejected

- GIVEN the user is adding a column
- WHEN the user submits the form with an empty or whitespace-only title
- THEN the system MUST reject the submission
- AND MUST NOT add a new column to the board

### Requirement: Rename a column

The system MUST allow users to rename an existing column by editing its title inline.

#### Scenario: Rename column with valid title

- GIVEN a column exists on the board
- WHEN the user confirms a new valid title for the column
- THEN the column MUST display the updated title

#### Scenario: Rename column with empty title rejected

- GIVEN a column exists on the board
- WHEN the user attempts to save an empty or whitespace-only title
- THEN the system MUST reject the change
- AND the column MUST keep its previous title

#### Scenario: Rename non-existent column does nothing

- GIVEN a column ID that does not exist in the board state
- WHEN the system receives a rename action for that ID
- THEN the system MUST NOT modify any column state

### Requirement: Delete a column

The system MUST allow users to delete an empty column.

#### Scenario: Delete empty column

- GIVEN a column contains no cards
- WHEN the user confirms deletion of that column
- THEN the column MUST be removed from the board

#### Scenario: Delete non-empty column is blocked

- GIVEN a column contains one or more cards
- WHEN the user attempts to delete that column
- THEN the system MUST show a message indicating cards must be moved first
- AND the column MUST NOT be removed

#### Scenario: Delete last empty column is allowed

- GIVEN the board has exactly one column and it is empty
- WHEN the user confirms deletion
- THEN the column MUST be removed
- AND the board MUST render with zero columns

#### Scenario: Delete non-existent column does nothing

- GIVEN a column ID that does not exist in the board state
- WHEN the system receives a delete action for that ID
- THEN the system MUST NOT modify any column state

### Requirement: ColumnHeader component

A ColumnHeader component MUST handle title display, inline rename, and delete with confirmation.

#### Scenario: ColumnHeader displays column title

- GIVEN a column with a title
- WHEN the ColumnHeader renders in view mode
- THEN it MUST display the column title

#### Scenario: Click title enters rename mode

- GIVEN a column title is displayed in view mode
- WHEN the user clicks the title
- THEN the ColumnHeader MUST switch to an inline edit form

#### Scenario: Delete shows confirmation before removal

- GIVEN a column is displayed
- WHEN the user clicks delete on the ColumnHeader
- THEN the system MUST show a confirmation prompt before removing the column
