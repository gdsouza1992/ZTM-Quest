const LOCAL_STORAGE_GAME_STATE_KEY = 'gameState';

const initialState = () => ({
    player: {
        hasTalkedToBruno: false,
        wasInRestroom: false,
        hasHandsWashed: false,
    },
});

// in memory state
let currentState = undefined;

export const clearSavedGame = () => {
    localStorage.removeItemItem(LOCAL_STORAGE_GAME_STATE_KEY);
};

export const loadSavedGameState = () => {
    const stringifiedState =
        localStorage.getItem(LOCAL_STORAGE_GAME_STATE_KEY) || null;
    const savedState = JSON.parse(stringifiedState) || initialState();
    return savedState;
};

export const saveGameState = (newState) => {
    const stringifiedState = JSON.stringify(newState);
    localStorage.setItem(LOCAL_STORAGE_GAME_STATE_KEY, stringifiedState);
};

export const getGameState = () => {
    let gameState = undefined;
    if (currentState) {
        gameState = currentState;
    } else {
        // persistent state
        gameState = loadSavedGameState();
    }
    return gameState;
};

export const setGameState = (newState) => {
    currentState = newState;
    saveGameState(currentState);

    return currentState;
};
