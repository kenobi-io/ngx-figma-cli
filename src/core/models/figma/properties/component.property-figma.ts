/** An arrangement of published UI elements that can be 
 * instantiated across figma files */
export interface ComponentPropertyFigma {
    /** The key of the component */
    key: string;
    /** The name of the component */
    name: string;
    /** The description of the component as entered in the editor */
    description: string;
}
