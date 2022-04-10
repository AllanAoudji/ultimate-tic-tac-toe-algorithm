TODO Next
create classes for Game/Board/Player

Function TODO
checkIfTileBelongToSection
getCurrentPlayer.ts
getCurrentSection.ts
checkSectionStatus.ts
checkGameStatus.ts
pickMove.ts
converrt1DBoard81ToBoard3X3 ([81] => {status, position}[3][3])
=> getSubSection => forEach => checkIfWon
createTimer

Check player ([history].length %2)

Move (if [history].length === 0 || getCurrentSection.isFull === play everywhere)
=> check if move is valid (checkCurrentSection and if tile belong to this section)
=> reset player timer
=> save move to [history]
=> if section was not won before => check if section is win
=> if section.state = empty ==> Player(1|2) => check if game is win
=> check new current section from this move
=> trigger other player timer

https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project
