/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict'
const LexicalPlayground = process.env.NODE_ENV === 'development' ? require('./LexicalPlayground.dev.js') : require('./LexicalPlayground.prod.js')
module.exports = LexicalPlayground;