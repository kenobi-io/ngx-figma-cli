import { TextCaseEnum, TextDecorationEnum, LineHeightUnitEnum } from "./enums.property-figma";
import { PaintPropertyFigma } from "./paint.property-figma";
/** Metadata for character formatting */
export interface TypeStylePropertyFigma {
    /** Font family of text (standard name) */
    fontFamily: string;
    /** PostScript font name */
    fontPostScriptName: string;
    /** Space between paragraphs in px, 0 if not present */
    paragraphSpacing?: number;
    /** Paragraph indentation in px, 0 if not present */
    paragraphIndent?: number;
    /** Is text italicized? */
    italic: boolean;
    /** Numeric font weight */
    fontWeight: number;
    /** Font size in px */
    fontSize: number;
    /** Text casing applied to the node, default is the `ORIGINAL` casing */
    textCase?: TextCaseEnum;
    /** Text decoration applied to the node, default is `NONE` */
    textDecoration?: TextDecorationEnum;
    /** Horizontal text alignment as string enum */
    textAlignHorizontal: 'LEFT' | 'RIGHT' | 'CENTER' | 'JUSTIFIED';
    /** Vertical text alignment as string enum */
    textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
    /** Space between characters in px */
    letterSpacing: number;
    /** Paints applied to characters */
    fills: PaintPropertyFigma[];
    /** Line height in px */
    lineHeightPx: number;
    /** Line height as a percentage of normal line height */
    lineHeightPercent: number;
    /** Line height as a percentage of the font size. Only returned when lineHeightPercent is not 100 */
    lineHeightPercentFontSize?: number;
    /** The unit of the line height value specified by the user. */
    lineHeightUnit: LineHeightUnitEnum;
}
