import { functionWithName } from '..';

it('example', () => {
  function name1() {}
  expect(name1.name).toBe('name1');
  expect(functionWithName('name2', name1).name).toBe('name2');
});
