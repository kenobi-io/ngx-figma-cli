import { NodeFigma } from './node.figma';
import { DocumentFigma } from './document.figma';
import { ComponentPropertyFigma, StylePropertyFigma } from '../properties/properties';

export interface FileNodeFigma {
    name: String,
    role: String,
    lastModified: String,
    thumbnailUrl: String,
    err: String, // ? does't exist in real responce
    nodes: NodeFigma, // ? does't exist in real responce
    schemaVersion: number,
    styles: Map<String, StylePropertyFigma>,
    version: number,
    document: DocumentFigma,
    components: Map<String, ComponentPropertyFigma>
}