const parsePdb = require("parse-pdb");

const fetchProteinData = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch protein data");
  }

  const data = await response.text();

  return data;
};

export interface IAtom {
  serial: number;
  x: number;
  y: number;
  z: number;
  element: string;
  name: string;
}

export interface ISerials {
  [key: number]: { x: number; y: number; z: number };
}

export interface ILigandParserResult {
  atoms: IAtom[];
  serials: ISerials;
  connects: string[][];
}

export default async function ligandParser(
  ligand: string | undefined
): Promise<ILigandParserResult | undefined> {
  if (!ligand) {
    return;
  }

  const serials: ISerials = {};

  const data = await fetchProteinData(
    `https://files.rcsb.org/ligands/${ligand.charAt(0)}/${ligand}/${ligand}_ideal.pdb`
  );

  if (!data) {
    return;
  }

  const parsed = parsePdb(data);

  parsed.atoms.forEach((atom: IAtom) => {
    serials[atom.serial] = { x: atom.x, y: atom.y, z: atom.z };
  });

  const connectParsed = data
    .split("\n")
    .filter((line) => line.includes("CONECT"));

  const connectData = connectParsed.map((line) =>
    line
      .split(" ")
      .slice(1)
      .filter((item) => item !== "")
  );

  return { atoms: parsed.atoms, serials, connects: connectData };
}
