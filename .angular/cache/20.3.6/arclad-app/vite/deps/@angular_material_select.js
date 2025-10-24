import {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatOptgroup,
  MatOption,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger
} from "./chunk-WHSFFBME.js";
import "./chunk-6O5LDKL5.js";
import "./chunk-TPEWRKAV.js";
import "./chunk-NKKWHLRT.js";
import "./chunk-XPLGVNVK.js";
import "./chunk-FAP5CDEX.js";
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-7LXX65PF.js";
import "./chunk-EHA35TQX.js";
import "./chunk-42YE5226.js";
import "./chunk-VENV3F3G.js";
import "./chunk-46HAYV32.js";
import "./chunk-CC2ZI6LL.js";
import "./chunk-TLD2UFEA.js";
import "./chunk-QCKBGKXN.js";
import "./chunk-6A2YAX2E.js";
import "./chunk-PJ6NGC4D.js";
import "./chunk-5HTBKJJX.js";
import "./chunk-5EG33CFQ.js";
import "./chunk-CNQEMRZT.js";
import "./chunk-DXVAHOQY.js";
import "./chunk-XBV5RINJ.js";
import "./chunk-RECJTC4W.js";
import "./chunk-OZ66TFQG.js";
import "./chunk-7MF6KUVD.js";
import "./chunk-KKLVZY4M.js";
import "./chunk-GTURETX4.js";
import "./chunk-KIRYGHZK.js";
import "./chunk-CBAS7KCW.js";
import "./chunk-ZL6HUE7Z.js";
import "./chunk-PJVWDKLX.js";

// node_modules/@angular/material/fesm2022/select.mjs
var matSelectAnimations = {
  // Represents
  // trigger('transformPanel', [
  //   state(
  //     'void',
  //     style({
  //       opacity: 0,
  //       transform: 'scale(1, 0.8)',
  //     }),
  //   ),
  //   transition(
  //     'void => showing',
  //     animate(
  //       '120ms cubic-bezier(0, 0, 0.2, 1)',
  //       style({
  //         opacity: 1,
  //         transform: 'scale(1, 1)',
  //       }),
  //     ),
  //   ),
  //   transition('* => void', animate('100ms linear', style({opacity: 0}))),
  // ])
  /** This animation transforms the select's overlay panel on and off the page. */
  transformPanel: {
    type: 7,
    name: "transformPanel",
    definitions: [
      {
        type: 0,
        name: "void",
        styles: {
          type: 6,
          styles: { opacity: 0, transform: "scale(1, 0.8)" },
          offset: null
        }
      },
      {
        type: 1,
        expr: "void => showing",
        animation: {
          type: 4,
          styles: {
            type: 6,
            styles: { opacity: 1, transform: "scale(1, 1)" },
            offset: null
          },
          timings: "120ms cubic-bezier(0, 0, 0.2, 1)"
        },
        options: null
      },
      {
        type: 1,
        expr: "* => void",
        animation: {
          type: 4,
          styles: { type: 6, styles: { opacity: 0 }, offset: null },
          timings: "100ms linear"
        },
        options: null
      }
    ],
    options: {}
  }
};
export {
  MAT_SELECT_CONFIG,
  MAT_SELECT_SCROLL_STRATEGY,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER,
  MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY,
  MAT_SELECT_TRIGGER,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatOptgroup,
  MatOption,
  MatPrefix,
  MatSelect,
  MatSelectChange,
  MatSelectModule,
  MatSelectTrigger,
  MatSuffix,
  matSelectAnimations
};
//# sourceMappingURL=@angular_material_select.js.map
