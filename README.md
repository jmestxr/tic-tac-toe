# accessible-tic-tac-toe
An accessible tic-tac-toe game for sensory-impaired users.

## Steps to play accessible-tic-tac-toe on two browsers
1. On both browsers, go to https://accessible-tic-tac-toe.herokuapp.com/.
1. On both browsers, click on the orange ‘Start Now’ button to start a new player session. You will be navigated to the Dashboard.
1. On browser 1, click on the blue ‘Play Game’ button to enter a Game Room. Repeat for browser 2. Assuming that no other game sessions are in progress, browser 1 will be automatically matched against browser 2 for the same game.
1. During the middle of the game, the ‘Announce Board’ button (blue button on the bottom right) can be clicked to announce the current board state / previous moves made.
1. Once the game has ended, select the ‘Exit Room’ button (orange button on the bottom right) to return to the Dashboard.
1. Note that the ‘Show History’ button on the Dashboard is currently not working as it is not yet implemented due to time constraint.

## Accessibility Considerations
1. The app has to preferably cover all sensory impairments: cognitive, visual, auditory, motor and speech (N.A. as gameplay does not require player to talk). Currently the app has the following features to cover these impairments:
1. The navigation of the entire app and gameplay is accessible fully only via keyboard. None of the essential components require interaction via a mouse. 1. Notably, the tic-tac-toe board squares are implemented as buttons for the user to select the desired move. (Motor)
1. The inclusion of aria attributes on essential landmarks / components means that they are accessible via screen reader. Notably, the latest updates to the game state (e.g. when opponent has made move) is announced via aria-live=“assertive”. (Auditory)
1. In the event a visually impaired player has forgotten the previous moves made, they can be announced via the ‘Announce Board’ button in the Game Room at any point in time during the gameplay. (Visual)
1. The color theme of the app is selected such that all components have a clear visual hierarchy and can be distinguished clearly from one another. (Visual)


## Assumptions Made
There is no need for user authentication to play the app as the instructions only require the gameplay to work on two browser windows.

## Architecture Diagrams
![govtech tic-tac-toe 1](https://user-images.githubusercontent.com/87931905/218522473-b21caedd-c1f4-4014-8847-0b5c12949dd5.png)
![govtech tic-tac-toe 2](https://user-images.githubusercontent.com/87931905/218522485-4e2e09a0-1d84-44a3-beb6-3ef776884b1f.png)
