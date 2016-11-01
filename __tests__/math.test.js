
function area(w,h){
  return w*h;
}

describe('lovely tests', () => {
  
  test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });

  test('area', () => {
    expect(area(1,2)).toBe(2);
    expect(area(4,2)).toBe(8);
  });
});

describe('more lovely tests', () => {
  test('adds 2 + 2 to equal 4', () => {
    expect(2+2).toBe(4);
  });
});
