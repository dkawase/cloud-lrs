/**
 * Copyright ©2018. The Regents of the University of California (Regents). All Rights Reserved.
 *
 * Permission to use, copy, modify, and distribute this software and its documentation
 * for educational, research, and not-for-profit purposes, without fee and without a
 * signed licensing agreement, is hereby granted, provided that the above copyright
 * notice, this paragraph and the following two paragraphs appear in all copies,
 * modifications, and distributions.
 *
 * Contact The Office of Technology Licensing, UC Berkeley, 2150 Shattuck Avenue,
 * Suite 510, Berkeley, CA 94720-1620, (510) 643-7201, otl@berkeley.edu,
 * http://ipira.berkeley.edu/industry-info for commercial licensing opportunities.
 *
 * IN NO EVENT SHALL REGENTS BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT, SPECIAL,
 * INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS, ARISING OUT OF
 * THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF REGENTS HAS BEEN ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * REGENTS SPECIFICALLY DISCLAIMS ANY WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE
 * SOFTWARE AND ACCOMPANYING DOCUMENTATION, IF ANY, PROVIDED HEREUNDER IS PROVIDED
 * "AS IS". REGENTS HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES,
 * ENHANCEMENTS, OR MODIFICATIONS.
 */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var yargs = require('yargs');

/**
 * Run the ESLint code style linter
 */
gulp.task('eslint', function(done) {
  gulp
    .src(['*.js', 'apache/**/*.js', 'lib/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});

/**
 * Run Mocha tests
 */
gulp.task('mocha', function(done) {
  // Use default environment if none is specified
  process.env.NODE_ENV = process.env.NODE_ENV || 'test';

  gulp
    .src([ 'test/**/*.js' ])
    .pipe(mocha({
      fullStackTrace: true,
      grep: process.env.MOCHA_GREP || yargs.argv.grep,
      timeout: 10000
    }))
    .once('end', function() {
      process.exit();
    });
  done();
});

/**
 * Run tests and linters on dev workstation
 */

gulp.task('test',
  gulp.series('eslint', 'mocha'),
  function(done) {
    done();
  });

/**
 * Travis CI
 */
gulp.task('travis',
  gulp.parallel('eslint', 'mocha'),
  function(done) {
    done();
  });
