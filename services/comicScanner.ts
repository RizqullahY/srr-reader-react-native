import * as ExpoFileSystem from 'expo-file-system/legacy';

const FileSystem = ExpoFileSystem as any;

const COMIC_ROOT = FileSystem.documentDirectory + 'comics/';

export async function scanComics(): Promise<any[]> {
  const rootInfo = await FileSystem.getInfoAsync(COMIC_ROOT);
  if (!rootInfo.exists) return [];

  const seriesFolders = await FileSystem.readDirectoryAsync(COMIC_ROOT);

  const result = [];

  for (const seriesName of seriesFolders) {
    const seriesPath = COMIC_ROOT + seriesName + '/';

    const chapterFolders = await FileSystem.readDirectoryAsync(seriesPath);

    const chapters = chapterFolders.map((chapter: string) => ({
      name: chapter,
      path: seriesPath + chapter + '/',
    }));

    result.push({
      name: seriesName,
      path: seriesPath,
      chapters,
    });
  }

  return result;
}
