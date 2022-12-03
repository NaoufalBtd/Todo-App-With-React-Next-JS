import { TypeText } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  export interface TypeText {
    /** Enable or disable file poster */
    info?: string;
    // Other FilePond plugin options here...
  }
}
