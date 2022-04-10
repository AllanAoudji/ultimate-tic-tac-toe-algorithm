import checkIfTileBelongToSection from '@src/utils/checkIfTileBelongToSection';

describe('checkIfTileBelongToSection', () => {
  it('should throw an error if tile is out of range', () => {
    const wrongPosition = 90;

    expect(() => checkIfTileBelongToSection(wrongPosition, 0)).toThrow(
      'position out of range',
    );
  });

  it('should throw an error if section number is out of range', () => {
    const wrongSectionNumber = 9;

    expect(() => checkIfTileBelongToSection(0, wrongSectionNumber)).toThrow(
      'sectionNumber out of range',
    );
  });

  it('should return true if a tile belong to a section', () => {
    const sections = [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80],
    ];

    sections.forEach((section, index) => {
      section.forEach((tile) => {
        expect(checkIfTileBelongToSection(tile, index)).toBe(true);
      });
    });
  });

  it("should return false if a tile doesn't belong to a section", () => {
    expect(checkIfTileBelongToSection(57, 1)).toBe(false);
    expect(checkIfTileBelongToSection(0, 1)).toBe(false);
    expect(checkIfTileBelongToSection(0, 7)).toBe(false);
    expect(checkIfTileBelongToSection(63, 3)).toBe(false);
    expect(checkIfTileBelongToSection(77, 4)).toBe(false);
  });
});
