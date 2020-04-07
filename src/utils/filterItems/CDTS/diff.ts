/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/class-name-casing */

import { CharacterIdMap } from './CharacterIdMap';
import './diff_match_patch';

declare const diff_match_patch: any;

// declare class diff_match_patch {
//   diff_cleanupSemantic(): unknown;
//   diff_main(): unknown;
// }

/** @enum {number} */
export const Operation = {
  Equal: 0,
  Insert: 1,
  Delete: -1,
  Edit: 2,
};

/** @typedef {!Array<!{0: !Operation, 1: !Array<string>}>} */
// export let DiffArray;

export const DiffWrapper = {
  /**
   * @return {!Array.<!{0: number, 1: string}>}
   */
  charDiff: function(text1: string, text2: string, cleanup = false) {
    const differ = new diff_match_patch();
    const diff = differ.diff_main(text1, text2);
    if (cleanup) {
      differ.diff_cleanupSemantic(diff);
    }
    return diff;
  },

  // TODO: everything below might not be needed

  // lineDiff: function(lines1: string[], lines2: string[]): DiffArray {
  //   const idMap = new CharacterIdMap<string>();
  //   const text1 = lines1.map(line => idMap.toChar(line)).join('');
  //   const text2 = lines2.map(line => idMap.toChar(line)).join('');

  //   const diff = DiffWrapper.charDiff(text1, text2);
  //   const lineDiff = [];
  //   for (let i = 0; i < diff.length; i++) {
  //     const lines = [];
  //     for (let j = 0; j < diff[i][1].length; j++) {
  //       lines.push(idMap.fromChar(diff[i][1][j]));
  //     }

  //     lineDiff.push({ 0: diff[i][0], 1: lines });
  //   }
  //   return lineDiff;
  // },

  // convertToEditDiff: function(diff: DiffArray): [number, number][] {
  //   const normalized = [];
  //   let added = 0;
  //   let removed = 0;
  //   for (let i = 0; i < diff.length; ++i) {
  //     const token = diff[i];
  //     if (token[0] === Operation.Equal) {
  //       flush();
  //       normalized.push([Operation.Equal, token[1].length]);
  //     } else if (token[0] === Operation.Delete) {
  //       removed += token[1].length;
  //     } else {
  //       added += token[1].length;
  //     }
  //   }
  //   flush();
  //   return normalized;

  //   function flush() {
  //     if (added && removed) {
  //       const min = Math.min(added, removed);
  //       normalized.push([Operation.Edit, min]);
  //       added -= min;
  //       removed -= min;
  //     }
  //     if (added || removed) {
  //       const balance = added - removed;
  //       const type = balance < 0 ? Operation.Delete : Operation.Insert;
  //       normalized.push([type, Math.abs(balance)]);
  //       added = 0;
  //       removed = 0;
  //     }
  //   }
  // },
};
