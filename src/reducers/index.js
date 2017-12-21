import * as actions from "../actions";

const initialState = {
  guesses: [],
  feedback: "Make your guess!",
  auralStatus: "",
  correctAnswer: Math.round(Math.random() * 100) + 1
};

export const reducer = (state=initialState, action) => {
  if (action.type === actions.MAKE_GUESS) {
    let guess = parseInt(action.guess, 10);
    if (isNaN(guess)) {
      return Object.assign({}, state, {
        feedback: "Please enter a valid number"
      });
      return;
    }

    const difference = Math.abs(guess - state.correctAnswer);

    let feedback;
    if (difference >= 50) {
      feedback = 'You\'re Ice Cold...';
    } else if (difference >= 30) {
      feedback = 'You\'re Cold...';
    } else if (difference >= 10) {
      feedback = 'You\'re Warm.';
    } else if (difference >= 1) {
      feedback = 'You\'re Hot!';
    } else {
      feedback = 'You got it!';
    }

    return Object.assign({}, state, {
      feedback,
      guesses: [...state.guesses, guess]
    });

    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
    return state;
  } else if (action.type === actions.RESTART_GAME) {
    console.log("GAME RESTARTED");
    return Object.assign({}, state, {
      guesses: [],
      feedback: "Make your guess!",
      auralStatus: "",
      correctAnswer: Math.floor(Math.random() * 100) + 1
    });
  }
  return state;
};