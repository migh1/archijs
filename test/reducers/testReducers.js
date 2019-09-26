
export const INITIAL_STATE = {
  one: null,
  two: null,
  three: null,
  four: null,
};

function randomFunction() {
  return 'random data';
}

export default function test(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ONE': {
      return {
        ...state,
        one: 1,
      }
    }
    case 'TWO': {
      return {
        ...state,
        two: 2,
      }
    }
    case 'THREE': {
      return {
        ...state,
        three: 3,
      }
    }
    case 'FOUR': {
      return {
        ...state,
        four: 4,
      }
    }
    default:
      return state;
  }
}
