/**
 * @jest-environment jsdom
 */

 const { save,
  getSaved,
  pokeNames,
  loadList,
  removeSelected,
  cardsFunctions,
  filterNames, 
} = require('./script');

describe('1 - Testa a funçao save', () => {
  it('Testa se save é uma funçao', () => {
    expect.assertions(1);
    expect(typeof save).toBe('function'); 
  });
});

describe('2 - Testa a funçao getSaved', () => {
  it('Testa se getSaved é uma funçao', () => {
    expect.assertions(1);
    expect(typeof getSaved).toBe('function');
  });
});

describe('3 - Testa funçao pokeNames', () => {
  it('Testa seu retorno', async () => {
    expect.assertions(1);
    const pokeNames = jest.fn(() => true);
    await pokeNames();
    expect(pokeNames).toHaveReturned();
  })
  it('Testa se typeof pokeNames é objeto', async () => {
    await expect(typeof pokeNames()).toBe('object');
  })
})

describe('4 - Testa função loadList', () => { 
  it ('Testa se loadList é funçao', () => {
    expect(typeof loadList).toBe('function');
  });
});

describe('5 - Testa removeSelected', () => {
  it('Testa se removeSelected é funçao', () => {
    expect(typeof removeSelected).toBe('function');
  });
});

describe('6 - Testa cardsFunction', () => {
  it('Testa se cardsFunction é funçao', () => {
    expect(typeof cardsFunctions).toBe('function');
  });
});

describe('7 - Testa filterNames', () => {
  it('Testa se filterNames é funçao', () => {
    expect(typeof filterNames).toBe('function');
  });
  it('Testa se filterNames retorna objeto', async () => {
    await expect(typeof filterNames()).toBe('object');
  })
});