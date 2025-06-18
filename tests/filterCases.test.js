const fs = require('fs');
const path = require('path');
const {JSDOM} = require('jsdom');

function loadDom() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { window } = dom;
  // replace displayCurrentCase with a spy
  window.displayCurrentCase = jest.fn();
  return window;
}

describe('filterCases', () => {
  let window;

  beforeEach(() => {
    window = loadDom();
    // ensure incorrectCases is empty by default
    window.incorrectCases = [];
  });

  test('shows all cases when filter is "all"', () => {
    window.filterCases('all');
    expect(window.currentFilter).toBe('all');
    const cases = window.getFilteredCases();
    expect(cases.length).toBe(window.allCases.length);
    expect(window.displayCurrentCase).toHaveBeenCalled();
  });

  test('filters by category', () => {
    window.filterCases('Cardiology');
    expect(window.currentFilter).toBe('Cardiology');
    const cases = window.getFilteredCases();
    expect(cases.every(c => c.category.includes('Cardiology'))).toBe(true);
  });

  test('uses incorrect cases for review filter', () => {
    window.incorrectCases = [0, 1];
    window.filterCases('review');
    expect(window.currentFilter).toBe('review');
    const cases = window.getFilteredCases();
    expect(cases).toEqual([window.allCases[0], window.allCases[1]]);
  });

  test('ignores review filter when no incorrect cases', () => {
    window.currentFilter = 'all';
    window.displayCurrentCase.mockClear();
    window.filterCases('review');
    expect(window.currentFilter).toBe('all');
    expect(window.displayCurrentCase).not.toHaveBeenCalled();
  });
});
