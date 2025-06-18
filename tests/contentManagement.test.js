const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

function loadDom() {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const { window } = dom;
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
  // ensure clean storage and reinitialize
  window.localStorage.clear();
  if (typeof window.initializeArrays === 'function') {
    window.initializeArrays();
  }
  return window;
}

describe('content management localStorage', () => {
  let window;

  beforeEach(() => {
    window = loadDom();
  });

  test('saveCase and deleteCase update customCases', () => {
    const initialLength = window.getFilteredCases().length;

    // fill in case form fields
    window.document.getElementById('case-category').value = 'Test Category';
    window.document.getElementById('case-urgency').value = 'high';
    window.document.getElementById('case-presentation').value = 'Test presentation';
    window.document.getElementById('case-vitals').value = 'BP 120/80';
    window.document.getElementById('case-question').value = 'Test question?';
    window.document.getElementById('case-explanation').value = 'Explanation';
    for (let i = 0; i < 4; i++) {
      window.document.getElementById(`option-${i}`).value = `Opt ${i}`;
    }
    window.document.querySelector('input[name="correct"][value="1"]').checked = true;

    window.saveCase();

    const storedAfterSave = JSON.parse(window.localStorage.getItem('customCases'));
    expect(storedAfterSave.length).toBe(initialLength + 1);
    expect(storedAfterSave[storedAfterSave.length - 1].question).toBe('Test question?');

    window.deleteCase(initialLength);
    const storedAfterDelete = JSON.parse(window.localStorage.getItem('customCases'));
    expect(storedAfterDelete.length).toBe(initialLength);
    expect(storedAfterDelete.some(c => c.question === 'Test question?')).toBe(false);
  });

  test('saveFlashcard updates customFlashcards', () => {
    expect(window.localStorage.getItem('customFlashcards')).toBeNull();

    window.document.getElementById('flashcard-question-input').value = 'Flash Q';
    window.document.getElementById('flashcard-answer-input').value = 'Flash A';
    window.document.getElementById('flashcard-category-input').value = 'Cardiology';

    window.saveFlashcard();

    const stored = JSON.parse(window.localStorage.getItem('customFlashcards'));
    expect(stored.length).toBeGreaterThan(0);
    expect(stored[stored.length - 1].question).toBe('Flash Q');
  });
});
