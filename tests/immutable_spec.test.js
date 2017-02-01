import { List, Map } from 'immutable';
import { expect } from 'chai';

describe('immutable', function () {
  it('can compare objects', function () {
    var a = Map({key: 'value'}),
        b = a.merge({key: 'value'}),
        c = a.merge({key: 'other value'});

    expect(a).to.equal(b);
    expect(a).not.equal(c);
  });
});