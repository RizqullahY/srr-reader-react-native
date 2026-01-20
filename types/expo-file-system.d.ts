declare module 'expo-file-system' {
  export const documentDirectory: string | null;

  export function getInfoAsync(COMIC_ROOT: string) {
    throw new Error('Function not implemented.');
  }

  export function makeDirectoryAsync(COMIC_ROOT: string, arg1: { intermediates: boolean; }) {
    throw new Error('Function not implemented.');
  }

  export function deleteAsync(targetPath: string, arg1: { idempotent: boolean; }) {
    throw new Error('Function not implemented.');
  }
}
