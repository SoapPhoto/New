import exifr from 'exifr';

export interface IEXIF {
  orientation?: number;
  meteringMode?: string;
  exposureMode?: string;
  exposureBias?: string;
  date?: string;
  software?: string;
  location?: [number, number];
  make?: string;
  model?: string;
  focalLength?: string;
  aperture?: string;
  exposureTime?: string;
  ISO?: string;
}

export async function getImageEXIF(image: File) {
  const data = await exifr.parse(image);
  console.log(data);
}
