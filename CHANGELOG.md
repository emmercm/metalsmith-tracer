# Changelog

## v1.0.0 / 2021-11-24

- Convert to being a ECMAScript module (ESM) because both [callsites](https://www.npmjs.com/package/callsites) and [ora](https://www.npmjs.com/package/ora) are now.

  This will require you to use ECMAScript modules as well, and will require Node.js `^12.20.0 || ^14.13.1 || >=16.0.0`.

## v0.3.0 / 2020-05-17

- Fixed a `Cannot read property 'match' of null` issue.
- Fixed a `` / `` (Unix) vs. `` \ `` (Windows) path separator issue.

## v0.2.0 / 2020-03-24

- Fixed a `Cannot read property 'indexOf' of undefined` issue.

## v0.1.0 / 2020-02-29

- Filtered out:
    - [`async`](https://www.npmjs.com/package/async)
    - [`metalsmith-if`](https://www.npmjs.com/package/metalsmith-if)
    - [`timers.js` (`setImmediate()`)](https://nodejs.org/api/timers.html)
    - `next_tick.js`
- Added progress indicator.

## v0.0.1 / 2020-02-22

- Initial version.
