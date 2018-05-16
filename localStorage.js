import { Expo } from 'expo';
import { SecureStore } from 'expo';
// export const loadState = () => {
//   try {
//     const serializedState = SecureStore.getItemAsync('state');
//     if (serializedState === null) return undefined;
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.log(err);
//     return undefined;
//   }
// };

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      user: state.user,
    });
    SecureStore.setItemAsync('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
