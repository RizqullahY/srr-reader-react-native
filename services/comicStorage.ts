import * as ExpoFileSystem from 'expo-file-system/legacy';

import { unzip } from 'react-native-zip-archive';

// 🔥 JINAKKAN TYPESCRIPT
const FileSystem = ExpoFileSystem as any;

const COMIC_ROOT = FileSystem.documentDirectory + 'comics/';

export async function ensureComicRoot() {
  const dir = await FileSystem.getInfoAsync(COMIC_ROOT);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(COMIC_ROOT, {
      intermediates: true,
    });
  }
}

export async function extractComicZip(zipUri: string, name: string) {
  await ensureComicRoot();

  const targetPath = COMIC_ROOT + name;

  const info = await FileSystem.getInfoAsync(targetPath);
  if (info.exists) {
    await FileSystem.deleteAsync(targetPath, { idempotent: true });
  }

  await FileSystem.makeDirectoryAsync(targetPath);

  await unzip(zipUri, targetPath);

  return targetPath;
}
