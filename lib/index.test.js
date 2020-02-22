'use strict';

const {
  existsSync, mkdirSync, readdirSync, readFileSync, statSync,
} = require('fs');
const { join } = require('path');

const deepmerge = require('deepmerge');
const Metalsmith = require('metalsmith');
const assertDir = require('assert-dir-equal');

const tracer = require('./index');

const test = (dir, config) => {
  it(`should build the directory "${dir}"`, (done) => {
    // Allow src directory to not exist / be empty and not committed
    if (!existsSync(`${dir}/src`)) {
      mkdirSync(`${dir}/src`);
    }

    // Fake console.log
    const buffer = [];
    const options = deepmerge(config.options || {}, {
      log: (msg) => buffer.push(msg),
    });

    tracer(Metalsmith(`${dir}`), options)
      .use((files, metalsmith, metalsmithDone) => {
        metalsmithDone();
      })
      .build((err) => {
        if (config.error) {
          expect(err)
            .toBe(config.error);
        } else {
          expect(err)
            .toBeNull();
        }

        if (err) {
          done();
          return;
        }

        assertDir(`${dir}/build`, `${dir}/expected`, { filter: () => true });

        expect(buffer).toHaveLength(2);
        expect(buffer[0]).toContain('index.test.js');
        expect(buffer[1]).toContain('Total build time');

        done();
      });
  });
};

describe('metalsmith-tracer', () => {
  const dirs = (p) => readdirSync(p)
    .map((f) => join(p, f))
    .filter((f) => statSync(f)
      .isDirectory());
  dirs('lib/fixtures')
    .forEach((dir) => {
      const config = existsSync(`${dir}/config.json`) ? JSON.parse(readFileSync(`${dir}/config.json`)
        .toString()) : {};
      test(dir, config);
    });
});
