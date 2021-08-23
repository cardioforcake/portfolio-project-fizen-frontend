import { calcCSP, calcProgress, calcNewCSP } from './calc-functions';

test('calculates CSP', () => {
  // Set the target date one year in the future
  let targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 1);

  const params = {
    targetDate,
    riskTolerance: 3,
    currentAmount: 1000,
    targetAmount: 500000,
  };

  expect(calcCSP(params)).toBe(40275);
});

test('calculates progress', () => {
  // Set the target date one year in the future
  let targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 1);

  const params = {
    targetDate,
    riskTolerance: 3,
    currentAmount: 1000,
    targetAmount: 500000,
    cspAmount: 40275
  };

  expect(calcProgress(params)).toBe("1.000");
});

test('calculates new CSP based on progress', () => {
  // Set the target date one year in the future
  let targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 1);

  const params = {
    targetDate,
    riskTolerance: 3,
    currentAmount: 1000,
    targetAmount: 500000,
  };

  const progress = 1.000;
  //const progress = 1.0000168190625929;
  
  // FIXME This returns 40679, unexpected because calcCSP on same params
  // returns 40275
  expect(calcNewCSP(params, progress)).toBe(40275);
});
