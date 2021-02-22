import { VectorFigma } from "./vector.figma";
import { TypeStylePropertyFigma } from "../properties/properties";
/** A text box */
export interface TextFigma extends VectorFigma {
    /** Text contained within text box */
    characters: string;
    /** Style of text including font family and weight (see type style section for more information) */
    style: TypeStylePropertyFigma;
    /** Array with same number of elements as characeters in text box, each element is a reference to the styleOverrideTable defined below and maps to the corresponding character in the characters field. Elements with value 0 have the default type style */
    characterStyleOverrides: number[];
    /** Map from ID to TypeStyle for looking up style overrides */
    styleOverrideTable: {
        [mapId: number]: TypeStylePropertyFigma;
    };
}
