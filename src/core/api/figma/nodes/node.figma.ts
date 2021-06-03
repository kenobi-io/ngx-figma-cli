import { Nodes } from "../properties/properties";

/**
 * Node type indicates what kind of node you are working with: for example,
 * a FRAME node versus a RECTANGLE node. A node can have additional properties
 * associated with it depending on its node type.
 */
export interface NodeFigma {
  /** A string uniquely identifying this node within the document.*/
  id: string;
  /** The name given to the node by the user in the tool. */
  name: string;
  /** default: true. Whether or not the node is visible on the canvas.*/
  visible: boolean;
  /** The type of the node, refer to table below for details.*/
  type: Nodes;
  /** Data written by plugins that is visible only to the plugin
   *  that wrote it.Requires the`pluginData` to include the ID of the plugin.*/
  pluginData: any;
  /** Data written by plugins that is visible to all plugins.
   * Requires the`pluginData` parameter to include the string "shared".*/
  sharedPluginData: any;
}
