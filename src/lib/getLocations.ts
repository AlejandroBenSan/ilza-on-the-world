import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Location {
  id: number;
  name: string;
  position: [number, number];
  history: string;
  photo_url: string;
  additional_notes: string;
}

export const getLocations = (): Location[] => {
  const directoryPath = path.join(process.cwd(), 'src/data');
  const files = fs.readdirSync(directoryPath);

  return files.map((file, index) => {
    const filePath = path.join(directoryPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    console.log(data)
    return {
      id: index,
      name: `${data.first_name} ${data.last_name}`,
      position: [data.latitude, data.longitude],
      history: data.history,
      photo_url: data.photo_url,
      additional_notes: data.additional_notes
    };
  });
};