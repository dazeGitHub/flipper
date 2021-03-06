/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = function(babel, options) {
  return {
    name: 'change-process-to-electronProcess',
    visitor: {
      MemberExpression(path) {
        if (
          path.node.object.type === 'Identifier' &&
          path.node.object.name === 'process' &&
          !path.scope.hasBinding('process')
        ) {
          path.node.object.name = 'electronProcess';
        } else if (
          path.node.object.type === 'MemberExpression' &&
          path.node.object.object.type === 'Identifier' &&
          path.node.object.object.name === 'global' &&
          path.node.object.property.type === 'Identifier' &&
          path.node.object.property.name === 'process'
        ) {
          path.node.object.property.name = 'electronProcess';
        }
      },
    },
  };
};
